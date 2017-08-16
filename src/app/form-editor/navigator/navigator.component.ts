import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigatorService } from '../../Services/navigator.service';
import { QuestionControlService } from '../../Services/question-control.service';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { FormElementFactory } from '../form-elements/form-element-factory';
import { ConfirmComponent } from '../../modals/confirm.component';
import { PromptComponent } from '../../modals/prompt.component';
import { DialogService } from "ng2-bootstrap-modal";
@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})

export class NavigatorComponent implements OnInit {

  private schema:any; //recursive schema could represent a question,section,page or form
  private _formSchema:any; //represents a FULL form schema
  @Input() pageIndex:number; //aids in collapsing the navigator elements
  @Input() sectionIndex:number; //aids in collapsing the navigator elements
  @Input() questionIndex:number;
  @Output() closeSidebar:EventEmitter<boolean> = new EventEmitter();
  pageToggle:boolean=false;
  sectionToggle:boolean=false;

  addElementForm:FormGroup;
  editForm:FormGroup;

  editPageMode:boolean=false;
  editSectionMode:boolean=false;

  
  propertyModelArray:any;
  elementLabel:string;
  
  @Input() set _schema(schema:any){
     this.schema = schema; //recursive
    }

  @Input()  set formSchema(schema:any){
    this._formSchema = schema; //maintains the full form
  }

  constructor(private fb: FormBuilder,private ns: NavigatorService,private qcs:QuestionControlService,
    private formElementFactory:FormElementFactory,private dialogService:DialogService) {
    }

  ngOnInit() {}

  //when element is clicked in navigator
  onClicked(selectedSchema, pageIndex?:number, sectionIndex?:number, questionIndex?:number){
    let schemaObj={}
    schemaObj['selectedSchema']=selectedSchema;
    schemaObj['pageIndex']=pageIndex;
    schemaObj['sectionIndex']=sectionIndex;
    schemaObj['questionIndex']=questionIndex;
    this.ns.setSelectedElement(schemaObj);
  }

 
  createNewQuestion(pageIndex:number,sectionIndex:number,questionIndex?:number){
    let newQuestion = this.formElementFactory.createFormElement("question",{});
    let propertyModelArray = this.qcs.toPropertyModelArray(newQuestion);
    if(questionIndex) //obsGroup Question
    this.ns.newQuestion(propertyModelArray,pageIndex,sectionIndex,questionIndex);
    else
    this.ns.newQuestion(propertyModelArray,pageIndex,sectionIndex);
    
  }


  showElementEditForm(schema:any,pageIndex?:number,sectionIndex?:number){
    this.propertyModelArray = this.qcs.toPropertyModelArray(schema)
    this.editForm = this.qcs.toFormGroup(this.propertyModelArray)

    if(schema.sections){
      this.dialogService.addDialog(PromptComponent, {
      title:'Edit Page',
      questions:this.propertyModelArray,
      form:this.editForm})
      .subscribe((formValue)=>{
        //We get dialog result
        if(formValue)
        this.editPage(formValue['label'],pageIndex)
      });
    }
    else{
      this.dialogService.addDialog(PromptComponent, {
      title:'Edit Section',
      questions:this.propertyModelArray,
      form:this.editForm})
      .subscribe((formValue)=>{
        //We get dialog result
        if(formValue)
        this.editSection(formValue,pageIndex,sectionIndex)
      });
    
    }
    
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



  showElementAddForm(element:string,pageIndex?:number){
    if(element=="page"){
      let newPage = this.formElementFactory.createFormElement("page",{"label":''});
      this.propertyModelArray = this.qcs.toPropertyModelArray(newPage);
      this.addElementForm = this.qcs.toFormGroup(this.propertyModelArray)
       this.dialogService.addDialog(PromptComponent, {
      title:'Create Page',
      questions:this.propertyModelArray,
      form:this.addElementForm},{backdropColor:'rgba(255, 255, 255, 0.5)'})
      .subscribe((formValue)=>{
        //We get dialog result
        if(formValue)
        this.addPage(formValue['label'])
      });
    }
  else{
    
    let newSection = this.formElementFactory.createFormElement("section",{})
    this.propertyModelArray = this.qcs.toPropertyModelArray(newSection)
    this.addElementForm = this.qcs.toFormGroup(this.propertyModelArray)
    this.dialogService.addDialog(PromptComponent, {
      title:'Create Section',
      questions:this.propertyModelArray,
      form:this.addElementForm},{backdropColor:'rgba(255, 255, 255, 0.5)'})
      .subscribe((formValue)=>{
        if(formValue!=undefined)
        this.addSection(formValue,pageIndex)
      });


  }
  }

  addPage(label:string){
    if(!this.doesElementExist(label)){
      let newPage = this.formElementFactory.createFormElement("page",{"label":label})
      this._formSchema.pages.push(newPage)
      this.ns.setSchema(this._formSchema)
    }
    else{
      alert("Page already exists!")
    }
  }

  addSection(value,pageIndex:number){
    
      let newSection = this.formElementFactory.createFormElement("section",{"label":value.label,"isExpanded":value.isExpanded})
      this._formSchema.pages[pageIndex].sections.push(newSection)
      this.ns.setSchema(this._formSchema)
      this.addElementForm.reset()
    
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

  doesElementExist(label:string){
      for(var page of this._formSchema.pages)
        if(page.label === label) return true;
      return false;
  }

  deleteDialog(schema:any, element:string,  pageIndex:number, sectionIndex?:number, questionIndex?:number, parentQuestionIndex?:number){
      this.dialogService.addDialog(ConfirmComponent, {
                title:'Delete '+element, 
                message:'Are you sure you want to delete '+schema.label},{backdropColor:'rgba(255, 255, 255, 0.5)'})
                .subscribe((isConfirmed)=>{
                    if(isConfirmed) {
                        this.deleteElement(schema,pageIndex,sectionIndex,questionIndex,parentQuestionIndex);
                    }
          });
  }

deleteElement(schema,pageIndex,sectionIndex,questionIndex,parentQuestionIndex){
  if(schema.sections){
    this._formSchema.pages.splice(pageIndex,1);
    
  }
  else if(schema.isExpanded){
    this._formSchema.pages[pageIndex].sections.splice(sectionIndex,1)
  }
  else if(parentQuestionIndex){
    this._formSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1);
  }
  else{
    this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex,1);
  }
  this.ns.setSchema(this._formSchema);
}
}
