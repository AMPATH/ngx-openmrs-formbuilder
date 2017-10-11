import { Component, Input, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup,FormControl,FormBuilder, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { SaveFormService } from '../../Services/save-form.service';
import { MdSnackBar } from '@angular/material';
import { SaveSnackbarComponent } from '../../form-editor/snackbar/saved-snackbar';
export interface SaveFormModel {
  title:string;
  name:any;
  uuid:string;
  version:number;
  encounterType:string;
  description:string;
  rawSchema:any;
  valueReference:any;
  resourceUUID:any;
  operation:string;
  encounterTypes:any;
}



@Component({
  selector: 'save-form',
  templateUrl: './save-form-modal.html' 
})

export class SaveFormsComponent extends DialogComponent<SaveFormModel, any> implements SaveFormModel,OnInit {
    form:FormGroup;
    title:string;
    name:any;
    uuid:string;
    version:number;
    encounterType:string;
    description:string;
    encounterTypes:any[];
    rawSchema:any;
    valueReference:any;
    resourceUUID:any;
    operation:string;
    encounterTypeUUID:string;
    
  constructor(dialogService: DialogService, private saveFormService:SaveFormService,
    private fb:FormBuilder,private snackbar:MdSnackBar) {
    super(dialogService);
  }

  ngOnInit(){
      this.encounterTypes.forEach(encounterType =>{
        if(encounterType.display == this.encounterType){
          this.encounterTypeUUID = encounterType.uuid;
        }
      });
      this.form = this.fb.group({
        name:new FormControl(this.name || '', Validators.required),
        version:new FormControl(this.version || '', Validators.required),
        encounter:new FormControl(this.encounterType || ''),
        description:new FormControl(this.description || '')
      });

      
  }
  save(formValue) {
  
    if(this.operation == 'overwrite'){
      this.updateForm();
    }

    if(this.operation == 'new'){
      this.uuid = undefined;
      this.createForm(formValue);
    }

    
    
    this.close();
  }

  // keyDownFunction($event,form){
  //   if($event.keyCode==13&&form.valid)
  //       this.save(form);
  // }

  showDoneSnackBar(){
    this.snackbar.openFromComponent(SaveSnackbarComponent,{duration:2000});
  }


  // save form with same version (overwrite)
  updateForm(){
    this.saveFormService.deleteClobData(this.valueReference).catch(error => console.error("Unable to delete clob data.")).then(res => 
      this.saveFormService.deleteResource(this.uuid,this.resourceUUID).catch(error => console.error("Unable to delete resource uuid. ")).then( res => 
        this.saveFormService.uploadSchema(this.rawSchema).subscribe(valueReference => {
          this.saveFormService.setNewValueReference(valueReference._body);
          this.saveFormService.getResourceUUID(this.uuid,valueReference._body).subscribe(resourceUUID => 
            {
              let parsedRes = JSON.parse(resourceUUID._body);
              this.saveFormService.setNewResourceUUID(parsedRes.uuid); 
              this.showDoneSnackBar();
          })})));
  }


  // create new form/ update form version
  createForm(form){

    this.saveFormService.uploadSchema(this.rawSchema).subscribe(valueReference => {
      this.saveFormService.saveNewForm(form.name,form.version,false,form.description,form.encounter).subscribe(createdForm =>{
        
        let parsedRes = JSON.parse(createdForm._body);
        console.log(parsedRes);
        this.saveFormService.setNewFormUUID(parsedRes.uuid);
        this.saveFormService.getResourceUUID(parsedRes.uuid,valueReference._body).subscribe(resourceUUID => 
          {
            let parsedRes = JSON.parse(resourceUUID._body);
            console.log(parsedRes);
            this.saveFormService.setNewResourceUUID(parsedRes.uuid); 
            this.showDoneSnackBar();
        })
      })});
  }

}
