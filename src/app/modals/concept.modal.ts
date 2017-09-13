import { Component, Input,OnInit,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup, FormBuilder, FormControl } from "@angular/forms";

export interface ConceptsModel {
  title:string;
  concepts:any;
}

@Component({
  selector: 'prompt',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()">&times;</button>
                     <h4 class="modal-title">Concepts</h4>
      
                   </div>
                   <div class="modal-body">
                   <form #conceptForm="ngForm"  (ngSubmit)="save(conceptForm.value)">
                   <div class="form-group">
                   <label for="concepts">Select a concept</label>
                    <select class = "form-control" id="concepts" name="concept" [(ngModel)]="pconcept" required>
                      <option *ngFor="let concept of concepts" [value]="concept.uuid">{{concept.name.display}}</option>
                    </select>
                    <br/>
                    <h6><b> UUID : {{pconcept}} </b></h6>
                  </div>
                  <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!conceptForm.valid">OK</button>
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
}`]

})
export class  ConceptsModalComponent extends DialogComponent<ConceptsModel, string> implements ConceptsModel,OnInit,AfterViewChecked {
  title: string;
  concepts:any;
  pconcept:string;
  checked=false;

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

  checkedToggle(){
    this.checked=true;
  }
}
