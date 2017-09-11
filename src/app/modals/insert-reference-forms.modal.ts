import { Component, Input,OnInit,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup, FormBuilder, FormControl } from "@angular/forms";

export interface ReferenceModel {
  title:string;
  forms:any;
}

@Component({
  selector: 'prompt',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()">&times;</button>
                     <h4 class="modal-title">Components</h4>
      
                   </div>
                   <div class="modal-body">
                   <form #form="ngForm"  (ngSubmit)="save(form.value)">
                   <div class="form-group">
                   <label>Select forms</label>
                   
                    <select class = "form-control" id="forms" name="form" ngModel required>
                      <option (change)="optionSelected($event)" *ngFor="let form of forms" [value]="form.uuid+' '+form.name">{{form.name}}</option>
                    </select>

                   
                    <div class="form-group" >
                      <label>Alias</label>
                      <input type="text" class="form-control" placeholder="Enter alias" name="alias" ngModel required>
                    </div>
              


                    <div class="form-group" >
                    <label>Display</label>
                    <input type="text" class="form-control" placeholder="Display" name="display" ngModel required>
                  </div>
                  </div>
                
                  <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!form.valid">OK</button>
                  <button type="button" class="btn btn-default" (click)="close()">Cancel</button>
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
    
    overflow-y: auto;
}
option{
  padding:10px;
  border-bottom: 1px solid lightgray;
}`
]

})
export class  InsertReferenceComponent extends DialogComponent<ReferenceModel, string> implements ReferenceModel,OnInit,AfterViewChecked {
  title: string;
  forms:any;
  selected:boolean = false;

  constructor(dialogService: DialogService,private fb:FormBuilder,private cdRef:ChangeDetectorRef) {
    super(dialogService);
  }

  ngOnInit(){
      
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  save(value) {
    this.result = value;
    this.close();
  }

  optionSelected($event){
    this.selected = true;
  }
 
}
