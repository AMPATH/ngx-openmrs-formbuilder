import { Component, Input,OnInit,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup, FormBuilder, FormControl } from "@angular/forms"
export interface AnswersModel {
  answers:any;
}

@Component({
  selector: 'prompt',
  templateUrl: './answers-modal.html',
  styleUrls:['./answers-modal.css']

})
export class AnswersComponent extends DialogComponent<AnswersModel, string> implements AnswersModel,OnInit,AfterViewChecked {
  answers:any;
  checkboxes={};
  checked:boolean=false;

  constructor(dialogService: DialogService,private fb:FormBuilder,private cdRef:ChangeDetectorRef) {
    super(dialogService);
  }
  

  ngOnInit(){
  
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  save(value) {
    this.result = JSON.stringify(this.checkboxes);
    this.close();
  }

  setCheckboxes(event,i){
    if(event.target.checked){
    this.checkboxes['answer'+i]=event.target.getAttribute('value');
  }
  
  else{
    delete this.checkboxes['answer'+i];
  }
    
   

  }

  selectAll(event){
    if(event.target.checked){
         this.answers.forEach((answer,index) => {
            this.checked = event.target.checked;
            this.checkboxes['answer'+index]=answer.display+","+answer.uuid;
    });
    }
   else{
       this.answers.forEach((answer,index) => {
            this.checked = false;
    });
      this.checkboxes = {};
  }
    
  }
 
}
