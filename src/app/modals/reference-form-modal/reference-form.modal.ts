import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { FetchFormDetailService } from '../../Services/openmrs-api/fetch-form-detail.service';
import { NavigatorModalComponent } from './../navigator.modal';
import { ReferenceForm } from '../../form-editor/reference-forms/reference-form-model';
import { Observable, Subscription } from 'rxjs';

// Observable class extensions

export interface ReferenceFormModalModel {
  title: string;
  refElement: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'prompt',
  templateUrl: './reference-form.modal.html',
  styleUrls: ['./reference-form.madal.css']
})
export class ReferenceModalComponent
  extends DialogComponent<ReferenceFormModalModel, string>
  implements ReferenceFormModalModel, OnInit, OnDestroy {
  title: string;
  refElement: string; // new element to be refd
  form: FormGroup;
  formAlias: string; // the form alias selected
  refForms: any[];
  searchValue = '';
  filteredForms: Observable<any[]>;
  selectField: FormControl = new FormControl('', Validators.required);
  errorMessage: string;
  subscription: Subscription;
  constructor(
    dialogService: DialogService,
    private fb: FormBuilder,
    private fs: FetchFormDetailService
  ) {
    super(dialogService);
    this.form = fb.group({ selectField: this.selectField });
  }

  ngOnInit() {
    this.fs.getReferencedFormsDetails().subscribe((res) => {
      this.refForms = res;
    });

    // this.filteredForms = this.selectField.valueChanges.map((ref) => {
    //   return ref ? this.filter(ref) : [];
    // })
  }

  // filter(ref){
  //   return this.refForms.filter(form =>
  //       form.formName.toLowerCase().indexOf(ref.toLowerCase()) !==-1);
  // }

  save(value) {
    let selectedForm;
    this.refForms.forEach((form) => {
      if (form['formName'] === value) {
        selectedForm = form;
        this.formAlias = form['alias'];
      }
    });

    if (selectedForm === undefined) {
      this.errorMessage = 'Please select a valid form';
      return;
    }
    if (selectedForm.ref.uuid) {
      this.errorMessage = undefined;
      this.fs
        .fetchFormMetadata(selectedForm.ref.uuid, true)
        .then((res) =>
          this.fs
            .fetchForm(res.resources[0].valueReference, true)
            .then((schema) =>
              this.showNavigatorDialog(
                schema,
                this.refElement,
                `Select ${this.refElement} to reference`
              )
            )
        );
    } else {
      console.error('formName is undefined!');
    }
  }

  showNavigatorDialog(schema, refElement: string, title: string) {
    this.subscription = this.dialogService
      .addDialog(
        NavigatorModalComponent,
        {
          title: title,
          schema: schema,
          referenceElement: refElement.toLowerCase()
        },
        { backdropColor: 'rgba(0, 0, 0, 0.8)' }
      )
      .subscribe((formValue) => {
        const i = {};
        i['form'] = this.formAlias;
        i[refElement + 's'] = formValue;

        if (formValue !== undefined) {
          this.result = JSON.stringify(i);
          this.close();
        }
      });
  }

  keyDownFunction($event) {
    // validate!
    if ($event.keyCode === 13 && this.form.valid) {
      this.save(this.selectField.value);
    }
  }

  filterForms(searchString: string) {
    searchString = searchString.toLowerCase();
    return this.refForms.filter((form) => {
      return form.name.toLowerCase().indexOf(searchString) !== -1;
    });
  }

  typeaheadOnSelect(e) {
    this.save(e.value);
  }
}
