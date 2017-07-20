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

  @Input() schema: any; //schema from parent component
  @Input() pageIndex:number; //aids in collapsing the navigator elements
  @Input() sectionIndex:number; //aids in collapsing the navigator elements

  pageToggle:boolean=true;

  addPageForm:FormGroup;

  constructor(private fb: FormBuilder,private ns: NavigatorService) {}


  ngOnInit() {
    this.addPageForm = this.fb.group({
      pageLabel : ['', Validators.required]
    })
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
    this.pageToggle = true;
  }

}
