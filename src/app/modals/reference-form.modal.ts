import { Component, Input } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms'
import { FetchFormsService } from '../Services/fetch-forms.service'
import { NavigatorModalComponent } from './navigator.modal';
import {ReferenceForm} from '../form-editor/reference-forms/reference-form-model'
import {Observable} from 'rxjs'
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
export interface ReferenceFormModalModel {
  title:string;
  refElement:string;
}

@Component({
  selector: 'prompt',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()">&times;</button>
                     <h4 class="modal-title">Search form to ref</h4>
                   </div>
                   <div class="modal-body">
                   <form [formGroup]="form"> 
                   <div class="form-group">
                   <label for="label">Select Form</label>
<<<<<<< HEAD
                    <select #selectField id="label" class="form-control" formControlName="selectField" >
                      
                      <option *ngFor="let form of refForms" [value]="form.formName">
=======
                    <select #formlabel id="label" class="form-control" formControlName="selectField">
                      <option *ngFor="let form of refForms">
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
                        {{form.formName}}
                      </option>
                    </select>
                    </div>
                   </form>
                   </div>
                   <div class="modal-footer">
<<<<<<< HEAD
                     <button type="button" class="btn btn-primary" (click)="save(selectField.value)" [disabled]="!form.valid">OK</button>
=======
                     <button type="button" class="btn btn-primary" (click)="save(formlabel.value)">OK</button>
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
                     <button type="button" class="btn btn-default" (click)="close()">Cancel</button>
                   </div>
                 </div>
                </div>`
})
export class ReferenceModalComponent extends DialogComponent<ReferenceFormModalModel, string> implements ReferenceFormModalModel {
  title: string;
  refElement:string; //new element to be refd
  form:FormGroup;
<<<<<<< HEAD
  refForms=this.fs.fetchReferencedForms();
=======
  refForms=[
  new ReferenceForm("triage.json","trg","xxxx"),
  new ReferenceForm("component_preclinic-review.json","pcr","xxxx"),
  new ReferenceForm("component_hospitalization.json","hosp","xxxx"),
  new ReferenceForm("component_art.json","art","xxxx")
]

>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
  formAlias:string; //the form alias selected

  selectField: FormControl = new FormControl("",Validators.required)

  constructor(dialogService: DialogService,private fb:FormBuilder,private fs:FetchFormsService) {
    super(dialogService);
    this.form = fb.group({selectField : this.selectField})
  }

  save(value) {
<<<<<<< HEAD

    this.refForms.forEach(form =>{
      if(form['formName']==value) this.formAlias = form['alias']
    })
    
    this.fs.fetchForm(value).subscribe(schema => this.showNavigatorDialog(schema,this.refElement,`Select ${this.refElement} to reference`))
  }

  showNavigatorDialog(schema,refElement:string,title:string){
    
    this.dialogService.addDialog(NavigatorModalComponent,
       {title:title,schema:schema, referenceElement:refElement.toLowerCase()},{backdropColor:'rgba(0, 0, 0, 0.8)'})
    .subscribe((formValue)=>{
      let i = {}
      i['form']=this.formAlias
      i[refElement+'s']=formValue

      if(formValue!=undefined) {
       this.result = JSON.stringify(i);
       this.close()
        }  
        
=======
    this.refForms.forEach(form =>{
      if(form.formName==value) this.formAlias = form.alias
    }
    )

    this.fs.fetchForm(value).subscribe(schema => this.showNavigatorDialog(schema,this.refElement,`Select ${this.refElement} to ref`))
  }

  showNavigatorDialog(schema,refElement:string,title:string){
    this.dialogService.addDialog(NavigatorModalComponent,
       {title:title,schema:schema, referenceElement:refElement.toLowerCase()},{backdropColor:'rgba(0, 0, 0, 0.8)'})
    .subscribe((formValue)=>{
      if(formValue!=undefined) {
       this.result = JSON.stringify({form:this.formAlias,pages:formValue});
        }
      
        
        this.close()
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
      
  });
  }
  
  
}
