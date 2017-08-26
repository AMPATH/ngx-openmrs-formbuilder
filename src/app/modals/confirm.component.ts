import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
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
                     <button type="button" class="btn btn-danger" (click)="confirm()">Delete</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel{
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = true;
    this.close();
  }
}