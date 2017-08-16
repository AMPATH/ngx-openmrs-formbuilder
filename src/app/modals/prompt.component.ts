import { Component, Input } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup } from "@angular/forms"
export interface PromptModel {
  title:string;
  questions:any;
  form:FormGroup;
}

@Component({
  selector: 'prompt',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()">&times;</button>
                     <h4 class="modal-title">{{title || 'Prompt'}}</h4>
                   </div>
                   <div class="modal-body">
                   <div *ngFor="let question of questions">
 <div [formGroup]="form">

  <div [ngSwitch]="question.controlType">

                          <div class="form-group">

    <input *ngSwitchCase="'textbox'" class="form-control" [formControlName]="question.key" [id]="question.key"
    [type]="question.type" [placeholder]="question.placeholder" [value]="question.value">
    
    </div>

<div class="form-group">
    <select *ngSwitchCase="'select'" class="form-control" [formControlName]="question.key" >
      <option value="" disabled selected>Is Expanded</option>
      <option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</option>
   </select>
</div>
</div>
</div>
                        </div>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="save()" [disabled]="!form.valid">Save</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
                </div>`
})
export class PromptComponent extends DialogComponent<PromptModel, string> implements PromptModel {
  title: string;
  questions: any;
  message: string = '';
  form:FormGroup;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  save() {
    this.result = this.form.value;
    this.close();
  }
}
