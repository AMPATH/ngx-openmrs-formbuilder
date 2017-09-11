import { Component, Input } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms'
import { FetchFormDetailService } from '../Services/fetch-form-detail.service'
import {Observable} from 'rxjs'
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
export interface NavigatorModalModel {
  title:string;
  referenceElement:string;
  schema:any;
}

@Component({
  selector: 'prompt',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <a (click)="close()" style="margin-right:10px; cursor:pointer"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                     <h4 class="modal-title title">Select {{referenceElement}} to reference</h4>
                   </div>
                   <div class="modal-body">
                   <app-navigator [_schema]="schema" [formSchema]="schema" [mode]="'select'" [referenceElement]="referenceElement" (checkedRefElementsEmitter)="rfEmitted($event)"></app-navigator>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="save()">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()">Cancel</button>
                   </div>
                 </div>
                </div>`,
                styles:[`
                .modal-body {
                  position: relative;
                  padding: 20px;
                  max-height: 550px;
                  overflow-y: auto;
              }
              .title{
                display:inline-block;
              }
              `]

})
export class NavigatorModalComponent extends DialogComponent<NavigatorModalModel, string> implements NavigatorModalModel {
  title: string;
  schema:any;
  referenceElement:string;
  checkedRefElements:any=[];
  res:string;

  constructor(dialogService: DialogService,private fb:FormBuilder,private fs:FetchFormDetailService) {
    
    super(dialogService);
    
    
  }

  rfEmitted(refElements:any[]){
  
    this.checkedRefElements = refElements;
  }

  close(){
    super.close();
    this.res=''
  }

  save() {
    this.res = JSON.stringify(this.checkedRefElements);   
    this.result=this.res;
    this.close();
  }

  
}
