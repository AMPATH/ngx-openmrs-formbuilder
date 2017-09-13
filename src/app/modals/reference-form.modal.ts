import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms'
import { FetchFormDetailService } from '../Services/fetch-form-detail.service'
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
                   <form [formGroup]="form" (keydown)="keyDownFunction($event)"> 
                   <div class="form-group">
                   <label for="label">Select Form</label>
                    <select #selectField id="label" class="form-control" formControlName="selectField" >
                      
                      <option *ngFor="let form of refForms" [value]="form.formName">
                        {{form.formName}}
                      </option>
                    </select>
                    </div>
                   </form>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="save(selectField.value)" [disabled]="!form.valid">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()">Cancel</button>
                   </div>
                 </div>
                </div>`
})
export class ReferenceModalComponent extends DialogComponent<ReferenceFormModalModel, string> implements ReferenceFormModalModel,OnInit {
  title: string;
  refElement:string; //new element to be refd
  form:FormGroup;
  formAlias:string; //the form alias selected
  refForms:any[];

  selectField: FormControl = new FormControl("",Validators.required)

  constructor(dialogService: DialogService,private fb:FormBuilder,private fs:FetchFormDetailService) {
    super(dialogService);
    this.form = fb.group({selectField : this.selectField})
  }

  ngOnInit(){
    this.fs.fetchReferencedForms().subscribe((res) =>{
      this.refForms = res;
    })
  }

  save(value) {
    let selectedForm;
    this.refForms.forEach(form =>{
      if(form['formName']==value) {
        selectedForm = form
        this.formAlias = form['alias']
        console.log(this.formAlias);
      }
    })
    this.fs.fetchFormMetadata(selectedForm.ref.uuid)
    .then(res => this.fs.fetchForm(res.resources[0].valueReference,true)
    .then(schema => this.showNavigatorDialog(schema,this.refElement,`Select ${this.refElement} to reference`)))
    
  }

  showNavigatorDialog(schema,refElement:string,title:string){
    
    this.dialogService.addDialog(NavigatorModalComponent,
       {title:title,schema:schema, referenceElement:refElement.toLowerCase()},{backdropColor:'rgba(0, 0, 0, 0.8)'})
    .subscribe((formValue)=>{
      let i = {}
      i['form']=this.formAlias;
      i[refElement+'s']=formValue;
    
      if(formValue!=undefined) {
        
       this.result = JSON.stringify(i);
       this.close()
        }  
        
      
  });
  }
  
  keyDownFunction($event){
    if($event.keyCode==13&&this.form.valid)
        this.save(this.selectField.value);
  }
  
}
