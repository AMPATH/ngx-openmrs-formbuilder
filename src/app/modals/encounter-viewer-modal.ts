import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface EncounterViewerModel {
  form: any;
  encounter: any;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'encounter-viewer-modal',
  template: `<div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">Obs</div>
        <button type="button" class="close" (click)="close()">&times;</button>
      </div>
      <div class="modal-body" *ngIf="form && encounter">
        <encounter-renderer
          [form]="form"
          [encounter]="encounter"
        ></encounter-renderer>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" (click)="close()">
          OK
        </button>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .msg {
        white-space: pre-line;
      }
    `
  ]
})
export class EncounterViewerModalComponent
  extends DialogComponent<EncounterViewerModel, null>
  implements EncounterViewerModel, OnInit {
  form: any;
  encounter: any;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  ngOnInit() {
    console.log(this.form, this.encounter);
  }
}
