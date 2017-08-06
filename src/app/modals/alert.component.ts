import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface AlertModel {
  message: string;
}

@Component({
  selector: 'alert',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                   </div>
                   <div class="modal-body">
                     <h5 class="text-center">{{message}}</h5>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-danger" (click)="close()">OK</button>
                   </div>
                </div>
             </div>`
})
export class AlertComponent extends DialogComponent<AlertModel, null> implements AlertModel {
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
