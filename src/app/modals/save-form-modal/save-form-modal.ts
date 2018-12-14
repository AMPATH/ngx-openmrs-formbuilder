import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { SaveFormService } from '../../Services/openmrs-api/save-form.service';
import { MatSnackBar } from '@angular/material';
import { SaveSnackbarComponent } from '../../form-editor/snackbar/saved-snackbar';
import { Constants } from '../../Services/constants';
export interface SaveFormModel {
  title: string;
  name: any;
  uuid: string;
  version: string;
  encounterType: string;
  description: string;
  rawSchema: any;
  valueReference: any;
  resourceUUID: any;
  operation: string;
  encounterTypes: any;
  published: boolean;
}

@Component({
  selector: 'save-form',
  templateUrl: './save-form-modal.html'
})

export class SaveFormsComponent extends DialogComponent<SaveFormModel, any> implements SaveFormModel, OnInit {
    form: FormGroup;
    title: string;
    name: any;
    uuid: string;
    version: string;
    encounterType: string;
    description: string;
    encounterTypes: any[];
    rawSchema: any;
    valueReference: any;
    resourceUUID: any;
    operation: string;
    encounterTypeUUID: string;
    published: boolean;
    formType: string;

  constructor(dialogService: DialogService, private saveFormService: SaveFormService,
    private fb: FormBuilder, private snackbar: MatSnackBar) {
    super(dialogService);
  }

  ngOnInit(){
    _.includes(this.name, 'component') ? this.formType = Constants.COMPONENT : this.formType = Constants.POC;

      this.encounterTypes.forEach(encounterType => {
        if (encounterType.display === this.encounterType) {
          this.encounterTypeUUID = encounterType.uuid;
        }
      });
      this.form = this.fb.group({
        name: new FormControl(this.name || '', Validators.required),
        version: new FormControl(this.version || '', Validators.required),
        encounter: new FormControl(this.encounterType || ''),
        description: new FormControl(this.description || '')
      });

      
  }
  save(formValue) {


    if (this.operation === 'overwrite') {
      if (this.name !== formValue.name){
        this.updateName(formValue.name, this.uuid).subscribe((res) => {
          this.updateForm();
        }); }
       if (this.version !== formValue.version){
          this.saveFormService.updateVersion(formValue.version, this.uuid).subscribe((res) => {
            this.updateForm();
          });
      }
       if ( this.encounterType !== formValue.encounter) {
        const encounterType = _.find(this.encounterTypes, (encounterType) => {
          return encounterType.display === formValue.encounter;
        });
        if (encounterType) {
          this.saveFormService.updateEncounterType(encounterType, this.uuid)
          .subscribe((res) => {
            this.updateForm();
          });
      } else {
        this.updateForm();
      }
    } else {
        this.updateForm();
       }
    }

    if (this.operation == 'new'){
      this.uuid = undefined;
      this.createForm(formValue);
    }


    this.result = true;
    super.close();
  }

  // keyDownFunction($event,form){
  //   if($event.keyCode==13&&form.valid)
  //       this.save(form);
  // }

  showDoneSnackBar(){
    this.snackbar.openFromComponent(SaveSnackbarComponent, {duration: 2000});
  }

  close(){
    this.result = false;
    super.close();
  }


  // save form with same version (overwrite)
  updateForm(){
    this.saveFormService.deleteClobData(this.valueReference).catch(error => console.error('Unable to delete clob data.')).then(res => 
      this.saveFormService.deleteResource(this.uuid, this.resourceUUID).catch(error => console.error('Unable to delete resource uuid. ')).then( res => 
        this.saveFormService.uploadSchema(this.rawSchema).subscribe(valueReference => {
          this.saveFormService.setNewValueReference(valueReference._body);
          this.saveFormService.getResourceUUID(this.uuid, valueReference._body).subscribe(resourceUUID => 
            {
              let parsedRes = JSON.parse(resourceUUID._body);
              this.saveFormService.setNewResourceUUID(parsedRes.uuid); 
              this.showDoneSnackBar();
          })})));
  }


  // create new form/ update form version
  createForm(form){
    if (form.encounter) this.encounterTypes.forEach((encounterType) => {
        if (encounterType.display == form.encounter){
          this.encounterTypeUUID = encounterType.uuid;
        }
      });
    else
      this.encounterTypeUUID = undefined;
    this.saveFormService.uploadSchema(this.rawSchema).subscribe(valueReference => {
      this.saveFormService.saveNewForm(form.name, form.version, false, form.description, this.encounterTypeUUID).subscribe(createdForm => {
        
        let parsedRes = JSON.parse(createdForm._body);
        console.log(parsedRes);
        this.saveFormService.setNewFormUUID(parsedRes.uuid);
        this.saveFormService.getResourceUUID(parsedRes.uuid, valueReference._body).subscribe(resourceUUID => 
          {
            let parsedRes = JSON.parse(resourceUUID._body);
            console.log(parsedRes);
            this.saveFormService.setNewResourceUUID(parsedRes.uuid); 
            this.showDoneSnackBar();
        })
      })});
  }


  updateName(name: string, uuid: string){
    return this.saveFormService.updateName(name, uuid);
  }

}
