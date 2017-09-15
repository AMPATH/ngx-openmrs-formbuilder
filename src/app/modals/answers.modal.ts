import { Component, Input,OnInit,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup, FormBuilder, FormControl } from "@angular/forms"
export interface AnswersModel {
  answers:any;
}

@Component({
  selector: 'prompt',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()">&times;</button>
                     <h4 class="modal-title">Answers</h4>
                   </div>
                   <div class="modal-body">
                   <form #answersForm="ngForm" (ngSubmit)="save(answersForm)">
                   <div *ngFor="let answer of answers;let i=index;">
                      <div class="checkbox" style="margin-left:20px;">
                        <h6><input type="checkbox" name="'choice'+i" [value]="label.value+','+answer.uuid"
                        (change)="setCheckboxes($event,i)" >
                        Answer {{i+1}}</h6>
                         <div class="form-group">
                      <input type="text" class="form-control" #label [value]="answer.display">
                        </div>
                        <br/>
                      </div>
                   </div>
                   <div class="modal-footer">
                   <button type="submit" class="btn btn-primary" [disabled]="!answersForm.valid">OK</button>
                   <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                 </div>
                 
                   </form>
                   </div>
                 </div>
                </div>`,
    styles:[`
.modal-dialog{
    overflow-y: initial !important
}
.modal-body{
    height: 650px;
    overflow-y: auto;
}`]

})
export class AnswersComponent extends DialogComponent<AnswersModel, string> implements AnswersModel,OnInit,AfterViewChecked {
  answers:any;
  checkboxes={};


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
 
}
