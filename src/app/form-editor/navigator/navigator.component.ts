import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import {NavigatorService} from '../../Services/navigator.service';
import {FormControl, FormGroup, FormBuilder,Validators} from '@angular/forms';
import {Page} from '../form-elements/Page'

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

  constructor(private fb: FormBuilder,private ns: NavigatorService) {}




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
    this.schema.pages.push(new Page(this.addPageForm.get('pageLabel').value));
    this.ns.setSchema(this.schema);
    this.pageToggler();
  }

  createSection(pageIndex){
    this.schema.sections.push({"label":this.addSectionForm.get('sectionLabel').value,"isExpanded":this.addSectionForm.get('isExpanded').value, "questions":[]})
    this._formSchema.pages[pageIndex] =this.schema;
    this.ns.setSchema(this._formSchema);
    this.sectionToggle=true;
  }
}
