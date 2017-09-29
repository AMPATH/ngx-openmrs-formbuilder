import { Component, OnInit, ViewChild, OnDestroy,AfterViewInit, AfterContentInit } from '@angular/core';
import {SnackbarComponent} from '../snackbar/snackbar.component';
import { FetchFormDetailService } from '../../Services/fetch-form-detail.service';
import { NavigatorService } from '../../Services/navigator.service';
import { QuestionIdService } from '../../Services/question-id.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MdSnackBar} from '@angular/material';
import { DialogService } from 'ng2-bootstrap-modal';
import { Form } from '../form-elements/Form';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Constants } from '../../Services/constants';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.css']
})
export class FormEditorComponent implements OnInit,OnDestroy{
  	  schema:any;
	  selectedSchema:any;
	  rawSelectedSchema:any;
	  strSchema:string;
	  rawSchema:any;
	  questions:any;
	  page:any; //to add new question
   	  section:any; //to add new section
	  question:any;
	  parentQuestion:any;
	  strRawSchema:string;
	  subscription:Subscription;
	  uuid:string
	  resource:any[];
	  disableCanDeactivate:boolean=false;
	  loading:boolean;

   @ViewChild('sidenav') public myNav;
  constructor( private fs: FetchFormDetailService, private  ns: NavigatorService,public snackbar:MdSnackBar, private router:Router, 
	private route:ActivatedRoute,public dialogService:DialogService, private ls:LocalStorageService){
  }

  closeElementEditor(){
	this.questions = undefined;
  }
 
  closeNavigator(event){
	  this.myNav.close();
	}
	
	openNavigator(){
		this.myNav.open();
	}


  ngOnInit(){
	this.loading = true;
	this.fs.setReferencedFormsArray([]);
	this.subscription = this.fs.loaded().subscribe((isLoaded) =>{
		if(isLoaded) this.loading = false;
	})

	this.subscription = this.route.params.subscribe(params => {
		this.uuid = params['uuid'];

		if(this.uuid=='new'){
			this.createNewForm();
			}

		else if(this.uuid=='restoredForm'){
			this.setFormEditor(this.ls.getObject(Constants.SCHEMA),this.ls.getObject(Constants.RAW_SCHEMA));
		}

		else{
			this.fs.fetchFormMetadata(this.uuid).then((metadata) => this.fetchForm(metadata.resources[0].valueReference))
			.catch(e => {
				this.loading = false;
				alert("Check your internet connection then refresh.");
			});
		}
		
	});
	
	this.subscription = this.ns.getRawSchema().subscribe(res =>{
		this.rawSchema = res;
		this.strRawSchema = JSON.stringify(this.rawSchema,null,"\t")
	})
	
	
	this.subscription = this.ns.getClickedElementRawSchema().subscribe(res => 
		{
			console.log("received raw",res)
			this.rawSelectedSchema = res
			this.strRawSchema = JSON.stringify(this.rawSelectedSchema,null,"\t")
		
		}
	)
 
  //on navigator element clicked for editing
  this.subscription= this.ns.getClickedElementSchema().subscribe(
	  res => {
		  this.selectedSchema = res;
		  this.strSchema = JSON.stringify(this.selectedSchema.selectedSchema,null,'\t');
	  }
  )

  //on element added/deleted/modified
  this.subscription =  this.ns.getSchema().subscribe(
	  res => {
		  
		  this.schema = res;
		  this.strSchema = JSON.stringify(this.schema,null,'\t');
		  this.showSnackbar();
	  }

   
  )

  this.subscription = this.ns.getNewQuestion().subscribe(
	res => {
		this.questions = res['schema'];
		this.page = res['pageIndex'];
		this.section = res['sectionIndex'];
		this.question = res['questionIndex'];
		this.parentQuestion = res['parentQuestionIndex'];
		this.myNav.close();
	}
  )
		
  }

  fetchForm(value){

   this.fs.fetchForm(value,false).then(res => {
		//	this.fs.getReferencedFormsArray().subscribe(res => console.log("REFERENCE FORM",res));

			if(this.checkIfSchemaProperlyCompiled(res.pages)){
				this.setFormEditor(res,this.fs.rawSchema);
			}

		
		}) 
		.catch((error)=>{
			this.loading=false;
		})
		
  }


  createNewForm(){
	this.loading = false;
	let schema=new Form({"name":"","processor":"EncounterFormProcessor","uuid":"xxxx","referencedForms":[],"pages":[]});
	this.setFormEditor(schema,schema);	
  }

  ngOnDestroy(){
	  this.subscription.unsubscribe();
  }

  canDeactivate()
  {
	  if(!this.disableCanDeactivate){
		return confirm("Are you sure you want to navigate away from this page and lose all changes?");
	  }
	  else{ return true; }
	  
  }

  checkIfSchemaProperlyCompiled(elements):boolean{
	
	let bool = true;
	let ets = [];
	elements.forEach((element)=>{

		if(!element.label){
			this.loading = false;
			ets.push(element);
			bool = false;
			return bool;
		}
		else{
			if(element.sections){
				this.checkIfSchemaProperlyCompiled(element.sections);
			}
			if(element.questions){
				this.checkIfSchemaProperlyCompiled(element.questions);
			}
		}
	});

	if(ets.length>0){
		
		this.alertUser(ets);
	}
	return bool;
  }

  alertUser(elements){
	  alert("This form cannot be edited because the some referenced elements was not found. Please check the respective components if these elements exist then retry \n \n"+ JSON.stringify(elements,null,2));
	  this.disableCanDeactivate = true;
	  this.router.navigate(['/forms']);
  }


  showSnackbar(){
	this.snackbar.openFromComponent(SnackbarComponent,{duration:1500,});
}

setFormEditor(schema,rawSchema){
	this.selectedSchema = schema;
	this.schema = schema;
	this.strSchema = JSON.stringify(schema,null,'\t');
	this.rawSchema = rawSchema;
	this.ns.setRawSchema(this.rawSchema)
	this.strRawSchema = JSON.stringify(this.rawSchema,null,"\t");
}


}

