import { Component, Input, OnInit,OnDestroy, Output, EventEmitter } from '@angular/core';
import { ConfirmComponent } from '../../modals/confirm.component';
import { PromptComponent } from '../../modals/prompt.component';
import { AlertComponent } from '../../modals/alert.component';
import { ReferenceModalComponent } from '../../modals/reference-form.modal';
import { FormElementFactory } from '../form-elements/form-element-factory';
import {FormFactory} from '../form-elements/form-factory.service'
import { DialogService } from "ng2-bootstrap-modal";
import { NavigatorService } from '../../Services/navigator.service';
import { FetchFormsService } from '../../Services/fetch-forms.service';
import { QuestionControlService } from '../../Services/question-control.service';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { FormSchemaCompiler } from 'ng2-openmrs-formentry';


@Component({
	selector: 'app-navigator',
	templateUrl: './navigator.component.html',
	styleUrls: ['./navigator.component.css']
})

export class NavigatorComponent implements OnInit, OnDestroy{

	private schema:Object; //recursive schema could represent a question,section,page or form
	private _formSchema:any; //represents a FULL form schema
	private _count:number=0;
	private _refElement:string;
	private rawSchema:any;
	addForm:FormGroup;
	editForm:FormGroup;
	editPageMode:boolean=false;
	editSectionMode:boolean=false;
	propertyModelArray:any;
	editMode:boolean;
	selectMode:boolean;
	checkedRefElements:any[]=[] //selected elements to be referenced
	referencedForms:any[] //an array of referencedForms
	@Input() mode:string;      //can be either select or edit
	@Input() pageIndex:number; //aids in collapsing the navigator elements
	@Input() sectionIndex:number; //aids in collapsing the navigator elements
	@Input() questionIndex:number;
	@Input() set _rawSchema(schema){this.rawSchema= schema;}
	@Input() set referenceElement(refElement){this._refElement = refElement}; //element to be referenced if select mode
	@Input() set count(count){this._count=count;}//keeps count of recursive calls
	@Input() set _schema(schema:any){ this.schema = schema; }
	@Input() set formSchema(schema:any){ this._formSchema = schema;}
	@Output() closeSidebar:EventEmitter<boolean> = new EventEmitter();
	@Output() checkedRefElementsEmitter:EventEmitter<any[]> = new EventEmitter();
	@Output() nestedCheckedRefElementEmitter:EventEmitter<any> = new EventEmitter()

	constructor(private fb: FormBuilder,private ns: NavigatorService,private qcs:QuestionControlService,
		private formElementFactory:FormElementFactory,private dialogService:DialogService,
		private fs:FetchFormsService,private fsc:FormSchemaCompiler, private formFactory:FormFactory) 
		{
			this._count++;
			this.referencedForms = this.fs.referencedformsSchemas;
			
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
		this.ns.setClickedElementSchema(schemaObj);
		if(pageIndex!=undefined&&sectionIndex!=undefined) this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex].sections[sectionIndex])
		else this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex])
		
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
		if(element=='page'){
			
			let newPage = this.formElementFactory.createFormElement(element,{"label":''});
			this.propertyModelArray = this.qcs.toPropertyModelArray(newPage);
			this.addForm = this.qcs.toFormGroup(this.propertyModelArray)
			this.showAddDialog(this.propertyModelArray,this.addForm)
			
		}
		else{
		console.log(pageIndex)
		let newSection = this.formElementFactory.createFormElement(element,{})
		this.propertyModelArray = this.qcs.toPropertyModelArray(newSection)
		this.addForm = this.qcs.toFormGroup(this.propertyModelArray)
		this.showAddDialog(this.propertyModelArray,this.addForm,pageIndex)
		}
	}

	showDeleteDialog(schema:any, element:string,  pageIndex:number, sectionIndex?:number, questionIndex?:number, parentQuestionIndex?:number){
			this.dialogService.addDialog(ConfirmComponent, {
								title:'Delete '+element, 
								message:'Are you sure you want to delete '+schema.label},{backdropColor:'rgba(0,0, 0, 0.5)'})
								.subscribe((isConfirmed)=>{
										if(isConfirmed) {
												if(element=='page') this.deletePage(pageIndex)
												else if(element=='section') this.deleteSection(pageIndex,sectionIndex)
												else this.deleteQuestion(pageIndex,sectionIndex,questionIndex,parentQuestionIndex)
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
		if(pageIndex!=undefined&&pageIndex>-1){
			
			this.dialogService.addDialog(PromptComponent, {title:'Create Section',questions:propModelArray,form:form},{backdropColor:'rgba(255, 255, 255, 0.5)'})
				.subscribe((formValue)=>{
					if(formValue!=undefined) this.addSection(formValue,pageIndex)
			});

		}
			

		else
			this.dialogService.addDialog(PromptComponent, {title:'Create Page', questions:propModelArray,form:form},{backdropColor:'rgba(255, 255, 255, 0.5)'})
				.subscribe((formValue)=>{
				if(formValue) this.addPage(formValue['label'])
				});
	}


	editPage(label,pageIndex){
		this._formSchema.pages[pageIndex].label = label
		this.rawSchema.pages[pageIndex].label = label
		this.setSchema(this._formSchema)
		this.setRawSchema(this.rawSchema)
	}

	editSection(value,pageIndex,sectionIndex){
		this.schema['sections'][sectionIndex].label = value.label
		this.schema['sections'][sectionIndex].isExpanded = value.isExpanded
		this._formSchema.pages[pageIndex] =this.schema
		this.rawSchema.pages[pageIndex] = this.schema
		this.setSchema(this._formSchema);
		this.setRawSchema(this.rawSchema)
	}

	editQuestion(question:any,pageIndex:number,sectionIndex:number,questionIndex:number,parentQuestionIndex?:number){
		let schemaObj={}
		schemaObj['selectedSchema']=question;
		schemaObj['pageIndex']=pageIndex;
		schemaObj['sectionIndex']=sectionIndex;
		schemaObj['questionIndex']=questionIndex;
		schemaObj['parentQuestionIndex']=parentQuestionIndex;                                       
		this.ns.setClickedElementSchema(schemaObj); //set the current edited question in the schema editor

		this.propertyModelArray = this.qcs.toPropertyModelArray(question)
		if(parentQuestionIndex!=undefined&&parentQuestionIndex>-1){ //thy art an obsgroup question!
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
		console.log(this.rawSchema)
		this.rawSchema.pages.push(newPage)
		this.setSchema(this._formSchema)
		this.setRawSchema(this.rawSchema)
		}
		else this.showAlertDialog("Page already exists! \n Try creating one with a different label!")
	}

	addSection(value,pageIndex:number){
	
		let newSection = this.formElementFactory.createFormElement("section",{"label":value.label,"isExpanded":value.isExpanded})
		this._formSchema.pages[pageIndex].sections.push(newSection)
		this.rawSchema.pages[pageIndex].sections.push(newSection)
		this.setSchema(this._formSchema)
		this.setRawSchema(this.rawSchema)
		this.addForm.reset()
	}


	addQuestion(pageIndex:number,sectionIndex:number,questionIndex?:number){
		let newQuestion = this.formElementFactory.createFormElement("question",{});
		let propertyModelArray = this.qcs.toPropertyModelArray(newQuestion);
		if(questionIndex>-1) this.ns.newQuestion(propertyModelArray,pageIndex,sectionIndex,questionIndex);
		else this.ns.newQuestion(propertyModelArray,pageIndex,sectionIndex);
	}

	
	deletePage(pageIndex){
		this._formSchema.pages.splice(pageIndex,1);
		this.rawSchema.pages.splice(pageIndex,1);
		this.setSchema(this._formSchema)
		this.setRawSchema(this.rawSchema)
	}


	deleteSection(pageIndex,sectionIndex){
		this._formSchema.pages[pageIndex].sections.splice(sectionIndex,1)
		this.rawSchema.pages[pageIndex].sections.splice(sectionIndex,1)
		this.setSchema(this._formSchema);
		this.setRawSchema(this.rawSchema)
	}

	deleteQuestion(pageIndex,sectionIndex,questionIndex,parentQuestionIndex){
		 if(parentQuestionIndex!==undefined){
			this._formSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1);
			this._formSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1);
		 }
			 
		else {
			this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex,1);
		}
			
		this.setSchema(this._formSchema);
		this.setRawSchema(this._formSchema);
	}

	doesPageExist(label:string):boolean{
		let result=false;

		this._formSchema.pages.forEach(page =>{

			if(Object.is(label.toLowerCase(),page.label.toLowerCase())) {
				result = true;
			}
		})
		return result;
	}


	addReferencePage(){

		this.dialogService.addDialog(ReferenceModalComponent, {
			refElement:'Page'},{backdropColor:'rgba(0, 0, 0, 0.5)'})
		.subscribe((res)=>{
			if(res!=undefined){
				this.createRefPages(JSON.parse(res));
			}
				
		});
 
	}


	addReferenceSection(pageIndex){
		this.closeNav();
		this.dialogService.addDialog(ReferenceModalComponent, {
			refElement:'Section'},{backdropColor:'rgba(0, 0, 0, 0.5)'})
			.subscribe(res => {
				if(res!=undefined){
					this.createRefSections(JSON.parse(res),pageIndex)
				}
			})
	}
	
	addReferenceQuestion(pageIndex,sectionIndex,questionIndex?){
		this.closeNav();
		this.dialogService.addDialog(ReferenceModalComponent,{
			refElement:'Question'},{backdropColor:'rgba(0,0,0,0.5)'
		}).subscribe(res =>{
			if(res!=undefined){
				//this.createRefQuestions(JSON.parse(res),pageIndex,sectionIndex,questionIndex)
			}
		})
	}

	setCheckedReferenceElement(event,element?){
		
		let ev;
		let el;
		if(element){
			console.log(element)
			ev = event
			el = element
		}

		else{
			
			ev = event.event
			el = event.element
			
		}

		if(ev.target.checked){
			this.checkedRefElements.push(el)
		}
	
		else{
			
			if(this.checkedRefElements.length>0){
				this.checkedRefElements.forEach((element,index) =>
				 {
				if(typeof element !='object' && element==el){
					this.checkedRefElements.splice(index,1)
				}

				else if(typeof element == 'object'&& JSON.stringify(el) === JSON.stringify(element)){
					this.checkedRefElements.splice(index,1)
					
				}
			})
		}
	 }

	 if(this.schema['pages']) 
		this.checkedRefElementsEmitter.emit(this.checkedRefElements)
		
	}


	emitCheckedReferenceElement(event,element){

		let e={}
		e['event']=event
		e['element']=element
		this.nestedCheckedRefElementEmitter.emit(e)
		
	}

	

	closeNav(){
		this.closeSidebar.emit(true)
	}

	
	createRefPages(res){
		let formProps=this.createBasicFormProps();
		let tempSchema:Object;
	
		
		for(var el of JSON.parse(res['Pages'])){
			let obj:any = {}
			obj['reference'] = {"form":res.form,"page":el}
			formProps['pages'].push(obj)
			
			obj=JSON.stringify(obj)
			this.rawSchema.pages.push(JSON.parse(obj))
			this.setRawSchema(this.rawSchema)
		}
		
		
		let mockForm = this.formFactory.createForm(formProps)
		let compiledForm = this.fsc.compileFormSchema(mockForm,this.referencedForms)
		compiledForm['pages'].forEach(page =>{
			if(this.doesPageExist(page.label)) {
				this.showAlertDialog(page.label+" already exists! \n Try referencing one with a different label")}
			else {
				
				this._formSchema.pages.push(page)
				this.setSchema(this._formSchema);

				
				
			}})
		
		
		
	} 

	createRefSections(res,pageIndex){
		let formProps=this.createBasicFormProps(pageIndex);
		for(var el of JSON.parse(res['Sections'])){
			let obj:any = {}
			obj['reference'] = {"form":res.form, "page":el.page, "section":el.section}
			formProps['pages'][0]['sections'].push(obj)

			obj = JSON.stringify(obj)
			this.rawSchema.pages[pageIndex].sections.push(JSON.parse(obj))
			this.setRawSchema(this.rawSchema)
		}
		let mockForm = this.formFactory.createForm(formProps)
		let compiledForm = this.fsc.compileFormSchema(mockForm,this.referencedForms)
		compiledForm['pages'][0]['sections'].forEach(
			section => {
				this._formSchema.pages[pageIndex].sections.push(section)
		})
		this.setSchema(this._formSchema)
	}

	// createRefQuestions(res,pageIndex,sectionIndex,questionIndex?){
	// 	console.log(res)
	// 	let formProps=this.createBasicFormProps(pageIndex,sectionIndex)
	// 	for(var el of JSON.parse(res['Questions'])){
	// 		let obj = {}
	// 		  obj['reference']={"form":res.form, "page":el.page, "section":el.section, "question":el.question}
	// 		  formProps['pages'][0]['sections'][0].questions.push(obj)
			  		
	// 	}
	// 	 let mockForm = this.formFactory.createForm(formProps)
	// 	 let compiledForm = this.fsc.compileFormSchema(mockForm,this.referencedForms)
	// 	 console.log(compiledForm)
		//console.log(compiledForm)
		// compiledForm['pages'][0]['sections'][0]['questions'].forEach(
		// 	question => {
		// 		if(questionIndex!==undefined){
		// 			this._formSchema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].push(question)
		// 		}
		// 		else{
		// 			this._formSchema.pages[pageIndex].sections[sectionIndex].questions.push(question)
		// 		}
		// 	}
		// )

	   //}

	createBasicFormProps(pageIndex?,sectionIndex?){
		let formProps={}
		formProps['name']=this._formSchema.name;
		formProps['uuid']=this._formSchema.uuid;
		formProps['processor']=this._formSchema.processor;
		formProps['referencedForms']=this._formSchema.referencedForms;
		formProps['pages']=[]

		if(pageIndex!=undefined&&sectionIndex!=undefined){
			
			formProps['pages'].push(this.formElementFactory.createFormElement('page',{"label":this._formSchema.pages[pageIndex].label}));
			
			formProps['pages'][0].sections.push(this.formElementFactory.createFormElement('section',{"label":this._formSchema.pages[pageIndex].sections[sectionIndex].label,"questions":[]}))
			console.log("formProps", formProps)
			return formProps;
		}
		if(pageIndex!==undefined){
			formProps['pages'].push(this.formElementFactory.createFormElement('page',{"label":this._formSchema.pages[pageIndex].label}));
			return formProps;
		}

		else{
			return formProps;
		}
			
		
	}


	excludeQuestion(pageIndex,sectionIndex,questionIndex,parentQuestionIndex){

		if(parentQuestionIndex!=undefined){
			this._formSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1)
		}
		else{
			this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex,1)
		}
		this.findAndReplaceReferenceFormByName(this._formSchema.name,this._formSchema)
		
		
	}

	excludeSection(pageIndex,sectionIndex){
		this._formSchema.pages[pageIndex].sections.splice(sectionIndex,1);
		this.findAndReplaceReferenceFormByName(this._formSchema.name,this._formSchema)
	}

	findAndReplaceReferenceFormByName(name:string,schema:Object){
		this.referencedForms.forEach((form,index) =>{
			if(form.name==name){
				this.referencedForms.splice(index,1,schema);
			}
		})
	}

	showAlertDialog(message:string){
		this.dialogService.addDialog(AlertComponent,{message:message});
	}

	setRawSchema(obj){
		this.ns.setRawSchema(obj)
	}

	setSchema(schema:Object){
		this.ns.setSchema(this._formSchema)
	}
	ngOnDestroy(){

	}

} 
