import { Component, OnInit, ViewChild, OnDestroy,ChangeDetectorRef } from '@angular/core';
import {SnackbarComponent} from '../snackbar/snackbar.component';
import { FetchFormDetailService } from '../../Services/fetch-form-detail.service';
import { FetchAllFormsService } from '../../Services/fetch-all-forms.service';
import { NavigatorService } from '../../Services/navigator.service';
import { QuestionIdService } from '../../Services/question-id.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MdSnackBar} from '@angular/material';
import { DialogService } from 'ng2-bootstrap-modal';
import { Form } from '../form-elements/Form';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Constants } from '../../Services/constants';
import { SaveFormsComponent } from '../../modals/save-form-modal/save-form-modal';
import { ConfirmComponent } from '../../modals/confirm.component';
import { FormListService } from '../../Services/form-list.service';
import { SaveFormService } from '../../Services/save-form.service';
import { EncounterTypeService } from '../../Services/encounter-type.service';
import * as _ from 'lodash';


interface FormMetadata{
	name:string;
	uuid:string;
	valueReference:string;
	resourceUUID:string;
	version:number;
	description:string;
	encounterType:string;
	auditInfo:any;
	published:boolean;
}

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
	  disableCanDeactivate:boolean=false;
	  viewMode:string;
	  formMetadata:FormMetadata;
	  encounterTypes:any[];
      @ViewChild('sidenav') public myNav;
	  loading:boolean=true;

  constructor( private fs: FetchFormDetailService, private  ns: NavigatorService,public snackbar:MdSnackBar, private router:Router, 
	private route:ActivatedRoute,public dialogService:DialogService, private ls:LocalStorageService,private cdRef:ChangeDetectorRef,private fectAllFormsService:FetchAllFormsService,
	private formListService:FormListService,private saveFormService:SaveFormService,private encounterTypeService:EncounterTypeService){
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
	this.viewMode = 'singleView'; //default view mode
	this.cdRef.detectChanges();
	this.formMetadata = {
		name:"",
		uuid:"",
		valueReference: "",
		resourceUUID: "",
		version: null,
		encounterType : "",
		description : "",
		auditInfo: {},
		published : false,
	}

	this.fs.setReferencedFormsArray([]);
	this.subscription = this.fs.loaded().subscribe((isLoaded) =>{
		if(isLoaded) this.loading = false;
	});

	this.subscription = this.route.params.subscribe(params => {
		let uuid = params['uuid'];

		if(uuid=='new'){
			this.createNewForm();
			}

		else if(uuid=='restoredForm'){
			this.setFormEditor(this.ls.getObject(Constants.SCHEMA),this.ls.getObject(Constants.RAW_SCHEMA),this.ls.getObject(Constants.FORM_METADATA));
		}

		else{
			console.log("uuid",uuid)
			this.formMetadata.uuid = uuid;
			this.fs.fetchFormMetadata(this.formMetadata.uuid,false).then((metadata) => {
				console.log(metadata);
				this.formMetadata.version = metadata.version;
				this.formMetadata.name = metadata.name;
				if(metadata.encounterType) this.formMetadata.encounterType = metadata.encounterType.display;
				if(metadata.description) this.formMetadata.description = metadata.description;
				this.formMetadata.valueReference = metadata.resources[0].valueReference || '';
				this.formMetadata.resourceUUID = metadata.resources[0].uuid;
				this.formMetadata.auditInfo = metadata.auditInfo;
				this.formMetadata.published = metadata.published;
				// this.saveFormMetadata(this.formMetadata); //save form metadata to local storage for retrieval later on
				this.fetchForm(metadata.resources[0].valueReference);
			})
			.catch(e => {
				this.loading = false;
				console.error(e);
				alert("Check your internet connection then refresh.");
			});
		}
		
	});
	
	this.subscription = this.ns.getRawSchema().subscribe(res =>{
		this.rawSchema = res;
		this.strRawSchema = JSON.stringify(this.rawSchema,null,"\t");
		if(this.ls.getObject(Constants.SCHEMA)) if(this.rawSchema.name==this.ls.getObject(Constants.SCHEMA).name) this.saveRawDraft(this.rawSchema); //only save when compiled version exists in memory.
	});
	
	
	this.subscription = this.ns.getClickedElementRawSchema().subscribe(res => 
		{
			this.rawSelectedSchema = res
			this.strRawSchema = JSON.stringify(this.rawSelectedSchema,null,"\t")
		
		}
	);
 //prevent from saving form metadata.
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
		  this.saveDraft(this.schema);
		  this.saveFormMetadata(this.formMetadata);
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
});


	//getting new form metadata after saving remotely
	this.subscription = this.saveFormService.getNewResourceUUID().subscribe(uuid => this.formMetadata.resourceUUID = uuid);
	this.subscription = this.saveFormService.getNewValueReference().subscribe(value => this.formMetadata.valueReference = value);
	this.subscription = this.saveFormService.getNewFormUUID().subscribe(uuid => {
		this.formMetadata.uuid = uuid;
		this.disableCanDeactivate = true;
		this.router.navigate(['/edit',uuid]);
	});

	this.subscription = this.encounterTypeService.getEncounterTypes().subscribe(res => this.encounterTypes = res.results);

	
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
	this.ls.clear(); //clear local storage
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

setFormEditor(schema,rawSchema,formMetadata?){
	this.selectedSchema = schema;
	this.schema = schema;
	this.strSchema = JSON.stringify(schema,null,'\t');
	this.rawSchema = rawSchema;
	this.ns.setRawSchema(this.rawSchema);
	this.strRawSchema = JSON.stringify(this.rawSchema,null,"\t");
	if(formMetadata) this.formMetadata = formMetadata; // if form is being restored from local storage, retrieve metadata.
}

saveLocally(silently?:boolean){
	
	this.saveDraft(this.schema);
	this.saveRawDraft(this.rawSchema);
	this.saveFormMetadata(this.formMetadata);
	if(!silently) this.showSaveSnackbar();
	
}

saveRemotely(){
	this.saveLocally(true);
	if(this.formMetadata.published||!_.isEmpty(this.formMetadata.uuid)){
		let message="";
		if(this.formMetadata.published){
			message = "This form has been published. Would you want to overwrite the existing form?";
		}

		if(!_.isEmpty(this.formMetadata.uuid)){
			message = "Would you want to update the form or save as a new version?"
		}
		this.dialogService.addDialog(ConfirmComponent,{title:"Confirm Save", message:message, buttonText:"Update current version"},{backdropColor:'rgba(0,0, 0, 0.5)'})
		.subscribe((decision)=>{
				if(decision==1) { 
						//overwrite existing form
						this.showSaveDialog("overwrite");
				}

				if(decision==2){
					//save as a new version
					
					this.showSaveDialog("new",0);
				}
			});
			
	}

	else{
		this.showSaveDialog("new",0);
	}
	this.saveLocally(true);
	
}

showSaveDialog(operation:string,newVersion?:any){
	this.dialogService.addDialog(SaveFormsComponent, {
		title:"Save Form",
		operation:operation,
		name:  this.schema.name,
		uuid:this.formMetadata.uuid,
		version: +newVersion || +this.formMetadata.version,
		encounterType:this.formMetadata.encounterType,
		description:this.formMetadata.description,
		rawSchema:this.rawSchema,
		valueReference:this.formMetadata.valueReference,
		resourceUUID:this.formMetadata.resourceUUID,
		encounterTypes:this.encounterTypes
		   }, { backdropColor: 'rgba(255, 255, 255, 0.5)' });
}

toggleView(){
	this.viewMode = this.viewMode == 'singleView' ? 'multiView' : 'singleView';
}


showSaveSnackbar(){
	this.snackbar.open("Saved Locally!","",{duration:1200});
  }

  saveDraft(schema:any){

	this.ls.setObject(Constants.SCHEMA,schema);
	this.ls.setObject(Constants.TIME_STAMP,Date.now());
   
  }
  
  saveRawDraft(rawSchema:any){

	this.ls.setObject(Constants.RAW_SCHEMA,rawSchema);
	
	
  }

  saveFormMetadata(formMetadata){
	this.ls.setObject(Constants.FORM_METADATA,formMetadata);
  }

  publish(form,index){
	  let forms=[];
	  let sameFormsDifferentVersion=[];
	  this.subscription =	this.fectAllFormsService.fetchAllPOCForms().subscribe((POCForms:any) =>{
		forms = _.cloneDeep(POCForms.results); //currently only poc forms version 1
		let formName = this.formListService.removeVersionInformation(this.formMetadata.name);
		forms.splice(index,1);
		let formsWithoutVersionedNames = this.formListService.removeVersionInformationFromForms(forms);
		
		
		formsWithoutVersionedNames.forEach((form) =>{
		 if(form.name==formName){
			sameFormsDifferentVersion.push(form);
		 }
	   });
	
	   if(!_.isEmpty(sameFormsDifferentVersion))
	   sameFormsDifferentVersion.forEach((form)=>{
		 if(form.published) POCForms.results.forEach((pocform) =>{
		   if(pocform.uuid == form.uuid){
				this.dialogService.addDialog(ConfirmComponent,
				{title:"Confirm publish","message":"There is already a version of this form published. Would you like to unpublish that version and publish this one?","buttonText":"Publish"},
				{backdropColor:"rgba(0,0,0,0.5)"})
				.subscribe((isConfirmed) => {
						if(isConfirmed){
							this.saveFormService.unpublish(pocform.uuid).subscribe((res) => console.log(res));
						}})}})});
			console.log("here");
			this.saveFormService.publish(this.formMetadata.uuid).subscribe(res => this.formMetadata.published = true);
		
		});		
	  }

	  unpublish(){
		this.saveFormService.unpublish(this.formMetadata.uuid).subscribe((res) => this.formMetadata.published= false);
		
	  }


  exit(){
	  this.router.navigate(['/forms']);
  }
  
  
}

