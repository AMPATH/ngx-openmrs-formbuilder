import { Component, Input, OnInit, EventEmitter } from '@angular/core';
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
  pageToggle:boolean=true;
  sectionToggle:boolean=true;

  addPageForm:FormGroup;
  addSectionForm:FormGroup;

  @Input() set _schema(schema:any){
     this.schema = schema; //recursive
    }

  @Input()  set formSchema(schema:any){
    this._formSchema = schema; //maintains the full form
  }

  constructor(private fb: FormBuilder,private ns: NavigatorService,private qcs:QuestionControlService,
    private formElementFactory:FormElementFactory) {}




  ngOnInit() {
    this.addPageForm = this.fb.group({
      pageLabel : ['', Validators.required]
    })

    this.addSectionForm = this.fb.group({
      sectionLabel: ['', Validators.required],
      isExpanded:['', Validators.required]
    })
  }

  sectionToggler(){
    this.sectionToggle = this.sectionToggle === true ? false : true;
  }


  //display form to create a new page
  pageToggler(){
    this.pageToggle = this.pageToggle === true ? false : true;
  }

  

  //when element is clicked in navigator
  onClicked(schema){
    this.ns.setSelectedElement(schema);
    
    
  }

  //creating a new page
  createPage(){
    let options = {
      "label":this.addPageForm.get('pageLabel').value
    }
    let newPage = this.formElementFactory.createFormElement("page",options);
    this.schema.pages.push();
    this.ns.setSchema(this.schema);
    this.pageToggler();
  }

  createSection(pageIndex){

    let options = {
      "label":this.addSectionForm.get('sectionLabel').value,
      "isExpanded":this.addSectionForm.get('isExpanded').value,
    }
    let newSection = this.formElementFactory.createFormElement("section",options)
    this.schema.sections.push(newSection)
    this._formSchema.pages[pageIndex] =this.schema;
    this.ns.setSchema(this._formSchema);
    this.sectionToggle=true;
  }

  createNewQuestion(pageIndex:number,sectionIndex:number){
    console.log(" \n pageIndex: " + pageIndex + "section index: "+sectionIndex);
    
    let newQuestion = this.formElementFactory.createFormElement("question",{});
    //transform schema into property model array
    let propertyModelArray = this.qcs.toPropertyModelArray(newQuestion);
    this.ns.addNewQuestionSchema(propertyModelArray);
    
  }
  
}
