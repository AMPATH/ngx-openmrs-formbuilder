import { Component, OnInit, ViewChild, OnDestroy,AfterViewInit, AfterContentInit } from '@angular/core';
import { FetchFormDetailService } from '../../Services/fetch-form-detail.service';
import { NavigatorService } from '../../Services/navigator.service';
import { QuestionIdService } from '../../Services/question-id.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { DialogService } from 'ng2-bootstrap-modal';
import {Form} from '../form-elements/Form';
@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.css']
})
export class FormEditorComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit{

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

	  ngAfterViewInit(){
		  console.log("After view init.");
	  }


	  ngAfterContentInit(){
		  console.log("After content init. ")
	  }
   @ViewChild('sidenav') public myNav;
  constructor( private fs: FetchFormDetailService, private  ns: NavigatorService, private router:Router, private route:ActivatedRoute,public dialogService:DialogService){
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
		if(this.uuid!='new'){
			this.fs.fetchFormMetadata(this.uuid).then((metadata) => {
				console.log(metadata.resources)
				this.fetchForm(metadata.resources[0].valueReference)
			})
			.catch(e => alert("Form not found!"))
		}

		else{
			this.createNewForm();
		}
		
	})
	
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
	  }

   
  )

  this.subscription = this.ns.getNewQuestion().subscribe(
	res => {
		this.questions = res['schema']
		this.page = res['pageIndex']
		this.section = res['sectionIndex']
		this.question = res['questionIndex'];
		this.parentQuestion = res['parentQuestionIndex']
		this.myNav.close()
	}
  )
		
  }

  fetchForm(value){

   this.fs.fetchForm(value,false).then(res => {
	console.log("fetching form")
		//	this.fs.getReferencedFormsArray().subscribe(res => console.log("REFERENCE FORM",res));

			if(this.checkIfSchemaProperlyCompiled(res.pages)){
				this.selectedSchema = res;
				this.schema = res;
				this.strSchema = JSON.stringify(this.schema,null,'\t');
				this.rawSchema = this.fs.rawSchema;
				console.log(this.rawSchema);
				this.ns.setRawSchema(this.rawSchema)
				this.strRawSchema = JSON.stringify(this.rawSchema,null,"\t");
			}

		
		}) 
		
  }


  createNewForm(){
	this.loading = false;
	this.schema = new Form({"name":"","processor":"EncounterFormProcessor","uuid":"xxxx","referencedForms":[],"pages":[]});
	this.selectedSchema = this.schema;
	this.strSchema = JSON.stringify(this.schema,null,"\t");

	this.rawSchema = new Form({"name":"","processor":"EncounterFormProcessor","uuid":"xxxx","referencedForms":[],"pages":[]});
	this.ns.setRawSchema(this.rawSchema);
	this.strRawSchema = JSON.stringify(this.rawSchema,null,'\t');
	
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

	elements.forEach((element)=>{

		if(!element.label){
			this.alertUser(element);
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
	})

	return bool;
  }

  alertUser(page){
	  alert("This form cannot be edited because the following reference element was not found. \n \n"+ JSON.stringify(page,null,"\t"));
	  this.disableCanDeactivate = true;
	  this.router.navigate(['/forms']);
  }




}

