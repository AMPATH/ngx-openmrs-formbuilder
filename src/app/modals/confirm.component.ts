import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
export interface ConfirmModel {
  title: string;
  message: string;
  buttonText: string;
}

@Component({
  selector: 'app-modals',
  template: `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" (click)="close()">&times;</button>
        <h4 class="modal-title">{{ title || 'Confirm' }}</h4>
      </div>
      <div class="modal-body">
        <h5>{{ message || 'Are you sure you want to delete?' }}</h5>
      </div>
      <div class="modal-footer actions">
        <button type="button" class="btn btn-danger" (click)="confirm()">
          {{ buttonText || 'Delete' }}
        </button>
        <div style="display:inline-block" *ngIf="saveModal()">
          <button
            type="button"
            class="btn btn-success"
            (click)="confirmNewVersion()"
          >
            Save as a new version
          </button>
        </div>
        <button type="button" class="btn btn-default" (click)="close()">
          {{ 'Cancel' }}
        </button>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .actions {
        display: flex;
        justify-content: flex-end;
      }
      .actions button {
        margin: 0rem 0.5rem;
      }
    `
  ]
})
export class ConfirmComponent
  extends DialogComponent<ConfirmModel, number>
  implements ConfirmModel {
  title: string;
  message: string;
  buttonText: string;
  cancelButtonText: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  close() {
    super.close();
    if (!this.result) {
      this.result = 0;
    }
  }

  confirm() {
    this.result = 1;
    this.close();
    return this.result;
  }

  confirmNewVersion() {
    this.result = 2;
    this.close();
    return this.result;
  }

  saveModal() {
    if (this.buttonText) {
      if (this.buttonText.indexOf('Update') > -1) {
        return true;
      }
    }

    return false;
  }
}
