import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigatorService } from '../../Services/navigator.service';
import { QuestionControlService } from '../../Services/question-control.service';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { FormElementFactory } from '../form-elements/form-element-factory';

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
    private formElementFactory:FormElementFactory) {
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

 
  createNewQuestion(pageIndex:number,sectionIndex:number){
    let newQuestion = this.formElementFactory.createFormElement("question",{});
    let propertyModelArray = this.qcs.toPropertyModelArray(newQuestion);
    this.ns.newQuestion(propertyModelArray,pageIndex,sectionIndex);
    
  }


  displayEditElementForm(schema:any){
    this.propertyModelArray = this.qcs.toPropertyModelArray(schema)
    this.editForm = this.qcs.toFormGroup(this.propertyModelArray)
    if(schema.questions){
    this.editSectionMode = this.editSectionMode == true ? false : true;
    }
    else{
    this.editPageMode = this.editPageMode == true ? false : true;
    }
    this.elementLabel = schema.label
  }


  editElement(value,pageIndex,sectionIndex){
    if(sectionIndex == null){
      this._formSchema.pages[pageIndex].label = value.label
    }
    else{
    
      this.schema.sections[sectionIndex].label = value.label
      this.schema.sections[sectionIndex].isExpanded = value.isExpanded
      this._formSchema.pages[pageIndex] =this.schema
    }

    this.ns.setSchema(this._formSchema);
    this.editForm.reset();
    
  }



  showElementAddForm(element:string){
    if(element=="page"){
      this.pageToggle = this.pageToggle === true ? false : true;
      let newPage = this.formElementFactory.createFormElement("page",{"label":''});
      this.propertyModelArray = this.qcs.toPropertyModelArray(newPage);
      this.addElementForm = this.qcs.toFormGroup(this.propertyModelArray)
    }
  else{
    this.sectionToggle = this.sectionToggle === true ? false : true;
    let newSection = this.formElementFactory.createFormElement("section",{})
    this.propertyModelArray = this.qcs.toPropertyModelArray(newSection)
    this.addElementForm = this.qcs.toFormGroup(this.propertyModelArray)
  }
  }


  addElement(value,pageIndex:number){
    if(pageIndex==null){
      if(!this.doesElementExist(value.label)){
      let newPage = this.formElementFactory.createFormElement("page",{"label":value.label})
      this._formSchema.pages.push(newPage)
      this.pageToggle = this.pageToggle === true ? false : true;
      }
      else{
        alert("Page already exists!");
      }
    }

    else{
      let newSection = this.formElementFactory.createFormElement("section",{"label":value.label,"isExpanded":value.isExpanded})
      this.sectionToggle = this.sectionToggle === true ? false : true;
      this._formSchema.pages[pageIndex].sections.push(newSection)
    }

    this.ns.setSchema(this._formSchema)
    this.addElementForm.reset()
    
  }

  editQuestion(question,pageIndex,sectionIndex,questionIndex){
    let schemaObj={}
    schemaObj['selectedSchema']=question;
    schemaObj['pageIndex']=pageIndex;
    schemaObj['sectionIndex']=sectionIndex;
    schemaObj['questionIndex']=questionIndex;
    
    this.ns.setSelectedElement(schemaObj);
    this.propertyModelArray = this.qcs.toPropertyModelArray(question)
    this.ns.newQuestion(this.propertyModelArray,pageIndex,sectionIndex) 
  }

  doesElementExist(label:string){
      for(var page of this._formSchema.pages)
        if(page.label === label) return true;
      return false;
  }
}
