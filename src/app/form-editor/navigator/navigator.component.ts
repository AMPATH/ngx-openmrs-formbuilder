import { Component, Input, OnInit,OnDestroy, Output, EventEmitter } from '@angular/core';
import { ConfirmComponent } from '../../modals/confirm.component';
import { PromptComponent } from '../../modals/prompt.component';
import { ReferenceModalComponent } from '../../modals/reference-form.modal';
import { FormElementFactory } from '../form-elements/form-element-factory';
import { DialogService } from "ng2-bootstrap-modal";
import { DragulaService } from 'ng2-dragula';
import { NavigatorService } from '../../Services/navigator.service';
import { FetchFormsService } from '../../Services/fetch-forms.service';
import { QuestionControlService } from '../../Services/question-control.service';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';


@Component({
	selector: 'app-navigator',
	templateUrl: './navigator.component.html',
	styleUrls: ['./navigator.component.css']
})

export class NavigatorComponent implements OnInit, OnDestroy{

	private schema:any; //recursive schema could represent a question,section,page or form
	private _formSchema:any; //represents a FULL form schema
	addForm:FormGroup;
	editForm:FormGroup;
	editPageMode:boolean=false;
	editSectionMode:boolean=false;
	propertyModelArray:any;
	editMode:boolean;
	selectMode:boolean;
	checkedRefElements:any[]=[] //selected elements to be referenced

	@Input() referenceElement; //element to be referenced if select mode
	@Input() mode:string;      //can be either select or edit
	@Input() pageIndex:number; //aids in collapsing the navigator elements
	@Input() sectionIndex:number; //aids in collapsing the navigator elements
	@Input() questionIndex:number;
	@Input() set _schema(schema:any){ this.schema = schema; /**recursive*/ }
	@Input() set formSchema(schema:any){ this._formSchema = schema; /**maintains the full form*/}
	@Output() closeSidebar:EventEmitter<boolean> = new EventEmitter();
	@Output() checkedRefElementsEmitter:EventEmitter<any[]> = new EventEmitter();


	constructor(private fb: FormBuilder,private ns: NavigatorService,private qcs:QuestionControlService,
		private formElementFactory:FormElementFactory,private dialogService:DialogService,dragulaService:DragulaService,private fs:FetchFormsService) 
		{
			dragulaService.dropModel.subscribe((value,) => {
				if(this.schema == this._formSchema.pages[this.pageIndex]) this.onDropModel(value.slice(1))
			})
			dragulaService.removeModel.subscribe((value) => {
				this.onRemoveModel(value.slice(1))
			})
			
	}

	onDropModel(args){
		let [el, target, source] = args;
		this.ns.setSchema(this._formSchema)
	}

	onRemoveModel(args){
		let [el, source] = args;
		console.log(this._formSchema)
	}

	ngOnInit() {
		if(this.mode=='edit'){
			this.editMode = true
			this.selectMode = false
		}

		else{
			this.selectMode = true
			this.editMode=false
		}
	}

	//when element is clicked in navigator
	onClicked(selectedSchema, pageIndex?:number, sectionIndex?:number, questionIndex?:number){
		if(this.selectMode) return;
		let schemaObj={}
		schemaObj['selectedSchema']=selectedSchema;
		schemaObj['pageIndex']=pageIndex;
		schemaObj['sectionIndex']=sectionIndex;
		schemaObj['questionIndex']=questionIndex;
		this.ns.setSelectedElement(schemaObj);
	}

 
	showEditForm(schema:any,pageIndex:number,sectionIndex?:number){
		this.propertyModelArray = this.qcs.toPropertyModelArray(schema)
		this.editForm = this.qcs.toFormGroup(this.propertyModelArray)

		if(schema.sections){ //page
			this.showEditDialog(this.propertyModelArray,this.editForm,pageIndex)
		}
		else{ //section
			this.showEditDialog(this.propertyModelArray,this.editForm,pageIndex,sectionIndex)
		} 
	}


	showAddForm(element:string,pageIndex?:number){
		if(!pageIndex){
			let newPage = this.formElementFactory.createFormElement("page",{"label":''});
			this.propertyModelArray = this.qcs.toPropertyModelArray(newPage);
			this.addForm = this.qcs.toFormGroup(this.propertyModelArray)
			this.showAddDialog(this.propertyModelArray,this.addForm)
			
		}
		else{
		
		let newSection = this.formElementFactory.createFormElement("section",{})
		this.propertyModelArray = this.qcs.toPropertyModelArray(newSection)
		this.addForm = this.qcs.toFormGroup(this.propertyModelArray)
		this.showAddDialog(this.propertyModelArray,this.addForm,pageIndex)
	}
	}

	showDeleteDialog(schema:any, element:string,  pageIndex:number, sectionIndex?:number, questionIndex?:number, parentQuestionIndex?:number){
			this.dialogService.addDialog(ConfirmComponent, {
								title:'Delete '+element, 
								message:'Are you sure you want to delete '+schema.label},{backdropColor:'rgba(255, 255, 255, 0.5)'})
								.subscribe((isConfirmed)=>{
										if(isConfirmed) {
												this.deleteElement(schema,pageIndex,sectionIndex,questionIndex,parentQuestionIndex);
										}
					});
	}

	showEditDialog(propModelArray,form,pageIndex,sectionIndex?){
	
		if(sectionIndex>-1)
			this.dialogService.addDialog(PromptComponent, {title:'Edit Section',questions:propModelArray,form:form})
				.subscribe((formValue)=>{
				if(formValue) this.editSection(formValue,pageIndex,sectionIndex)
			});
	

		else
			this.dialogService.addDialog(PromptComponent, {title:"Edit Page",questions:propModelArray,form:form})
			.subscribe((formValue)=>{
				if(formValue) this.editPage(formValue['label'],pageIndex)
			});
	}


	showAddDialog(propModelArray,form,pageIndex?){
		if(pageIndex)
			this.dialogService.addDialog(PromptComponent, {title:'Create Section',questions:propModelArray,form:form},{backdropColor:'rgba(255, 255, 255, 0.5)'})
				.subscribe((formValue)=>{
					if(formValue!=undefined) this.addSection(formValue,pageIndex)
			});

		else
			this.dialogService.addDialog(PromptComponent, {title:'Create Page', questions:propModelArray,form:form},{backdropColor:'rgba(255, 255, 255, 0.5)'})
				.subscribe((formValue)=>{
				if(formValue) this.addPage(formValue['label'])
				});
	}


	editPage(label,pageIndex){
		this._formSchema.pages[pageIndex].label = label
		this.ns.setSchema(this._formSchema)
	}

	editSection(value,pageIndex,sectionIndex){
		this.schema.sections[sectionIndex].label = value.label
		this.schema.sections[sectionIndex].isExpanded = value.isExpanded
		this._formSchema.pages[pageIndex] =this.schema
		this.ns.setSchema(this._formSchema);
	}

	editQuestion(question:any,pageIndex:number,sectionIndex:number,questionIndex:number,parentQuestionIndex?:number){
		let schemaObj={}
		schemaObj['selectedSchema']=question;
		schemaObj['pageIndex']=pageIndex;
		schemaObj['sectionIndex']=sectionIndex;
		schemaObj['questionIndex']=questionIndex;
		schemaObj['parentQuestionIndex']=parentQuestionIndex;
		console.log(schemaObj)
		this.ns.setSelectedElement(schemaObj); //set the current edited question in the schema editor

		this.propertyModelArray = this.qcs.toPropertyModelArray(question)
		if(parentQuestionIndex){ //thy art an obsgroup question!
			this.ns.newQuestion(this.propertyModelArray,pageIndex,sectionIndex,questionIndex,parentQuestionIndex)
		}
		else{
		this.ns.newQuestion(this.propertyModelArray,pageIndex,sectionIndex,questionIndex)
		}
	 
	}


	addPage(label:string){
		if(!this.doesPageExist(label)){
		let newPage = this.formElementFactory.createFormElement("page",{"label":label})
		this._formSchema.pages.push(newPage)
		this.ns.setSchema(this._formSchema)
		}
		else alert("Page already exists! Try creating one with a different label!")
	}

	addSection(value,pageIndex:number){
	
		let newSection = this.formElementFactory.createFormElement("section",{"label":value.label,"isExpanded":value.isExpanded})
		this._formSchema.pages[pageIndex].sections.push(newSection)
		this.ns.setSchema(this._formSchema)
		this.addForm.reset()
	}


	addQuestion(pageIndex:number,sectionIndex:number,questionIndex?:number){
		let newQuestion = this.formElementFactory.createFormElement("question",{});
		let propertyModelArray = this.qcs.toPropertyModelArray(newQuestion);
		if(questionIndex>-1) this.ns.newQuestion(propertyModelArray,pageIndex,sectionIndex,questionIndex);
		else this.ns.newQuestion(propertyModelArray,pageIndex,sectionIndex);
	}

//Delete any element question,section or page
	deleteElement(schema,pageIndex,sectionIndex,questionIndex,parentQuestionIndex){
		if(schema.sections) this._formSchema.pages.splice(pageIndex,1);
		
		else if(schema.isExpanded) this._formSchema.pages[pageIndex].sections.splice(sectionIndex,1)
	
		else if(parentQuestionIndex) this._formSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1);
	
		else this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex,1);
	
		this.ns.setSchema(this._formSchema);
	}

	doesPageExist(label:string){
		for(var page of this._formSchema.pages)
			if(page.label === label) return true;
			else return false;
	}


	addReferencePage(){
		this.closeSidebar.emit(true)
		this.dialogService.addDialog(ReferenceModalComponent, {
		title:'Select form to reference',refElement:'Page'},{backdropColor:'rgba(0, 0, 0, 0.5)'})
		.subscribe((form)=>{
			if(form!=undefined){
				console.log(form)
			}
				
		});
 
}

	setCheckedReferencePage(event,page){
		if(event.target.checked){
			this.checkedRefElements.push(page)
		}
	
		else{
			if(this.checkedRefElements.length>0){
				this.checkedRefElements.forEach((element,index) =>
				 {
				if(element==page){
					this.checkedRefElements.splice(index,1)
				}
			})
		}
	 }

	 if(this.schema.pages) 
		this.checkedRefElementsEmitter.emit(this.checkedRefElements)
		
	}

ngOnDestroy(){
	

}

}
