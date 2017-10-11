import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
  buttonText:string
}

@Component({  
    selector: 'app-modals',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     
                     <button type="button" class="close" (click)="close()" >&times;</button>
                    
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <h5>{{message || 'Are you sure you want to delete?'}}</h5>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-danger" (click)="confirm()">{{buttonText || 'Delete'}}</button>
                     <div style="display:inline-block" *ngIf="buttonText.indexOf('consequences')>-1"><button type="button" class="btn btn-success" (click)="confirmNewVersion()">Save as a new version</button></div>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, number> implements ConfirmModel{
  title: string;
  message: string;
  buttonText:string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  close(){
    super.close();
    if(!this.result)
      this.result = 0;
  }

  confirm() {
    this.result = 1;
    this.close();
    return this.result;
  }

  confirmNewVersion(){
    this.result = 2;
    this.close();
    return this.result;
  }
}