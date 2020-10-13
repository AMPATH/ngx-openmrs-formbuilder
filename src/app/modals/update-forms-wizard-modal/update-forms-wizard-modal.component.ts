import {
  Component,
  Input,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

export interface UpdateFormsWizardModel {
  oldComponentUUID: any;
  componentMetadata: any;
  selectedForms: any;
}

@Component({
  selector: 'prompt',
  templateUrl: './update-forms-wizard-modal.component.html',
  styleUrls: ['./update-forms-wizard-modal.component.css']
})
export class UpdateFormsWizardModalComponent
  extends DialogComponent<UpdateFormsWizardModel, string>
  implements UpdateFormsWizardModel, OnInit, AfterViewChecked {
  selectedForms: any;
  componentMetadata: any;
  oldComponentUUID: any;
  constructor(
    dialogService: DialogService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    super(dialogService);
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  finish($event) {
    this.result = 'finished';
    if ($event) {
      super.close();
    }
  }
}
