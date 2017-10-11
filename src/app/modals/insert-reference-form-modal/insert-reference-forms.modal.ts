import { Component, Input,OnInit,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup, FormBuilder, FormControl } from "@angular/forms";

export interface ReferenceModel {
  title:string;
  forms:any;
}

@Component({
  selector: 'prompt',
  templateUrl:'./insert-reference-forms.modal.html' ,
  styleUrls:['./insert-reference-forms.modal.css']
})
export class  InsertReferenceComponent extends DialogComponent<ReferenceModel, string> implements ReferenceModel,OnInit,AfterViewChecked {
  title: string;
  forms:any;
  selected:boolean = false;
  errorMessage:string;

  constructor(dialogService: DialogService,private fb:FormBuilder,private cdRef:ChangeDetectorRef) {
    super(dialogService);
  }

  ngOnInit(){
      
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  save(value) {
    let uuid = this.findFormUUID(value.refForm);
    if(uuid==undefined){
      this.errorMessage = "Invalid form."
    }
    else{
      this.errorMessage = undefined;
      value.form = uuid+" "+value.refForm;
      this.result = value;
      this.close();
    }
    
  }

  optionSelected($event){
    this.selected = true;
  }

  findFormUUID(formName){
    let uuid;
    this.forms.forEach(form => {
      if(form.name==formName) uuid = form.uuid;
    });
    return uuid;
  }
 
}
