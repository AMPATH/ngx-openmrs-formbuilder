import { Component, OnInit, Input } from '@angular/core';
import { InsertReferenceComponent } from '../../modals/insert-reference-form-modal/insert-reference-forms.modal';
import { FetchAllFormsService } from '../../Services/fetch-all-forms.service';
import { DialogService } from 'ng2-bootstrap-modal';
import {NavigatorService} from '../../Services/navigator.service';
import {FetchFormDetailService} from '../../Services/fetch-form-detail.service'
import {SchemaModalComponent} from '../../modals/schema-editor.modal'
import * as _ from 'lodash';

export class ReferenceForms{
  constructor(){}
  formName:string;
  alias:string;
  ref:Object={
    "uuid":'',
    "display":''
  }
  

}
@Component({
  selector: 'app-reference-forms',
  templateUrl: './reference-forms.component.html',
  styleUrls: ['./reference-forms.component.css']
})


export class ReferenceFormsComponent implements OnInit {
   _schema:any;
  private _rawSchema:any;
  private componentForms:any;
  private refForm:ReferenceForms=new ReferenceForms(); //the one being inserted
  private st:string='';
  private refFormsArray:any[];
  @Input() set schema(schema){
    this._schema = _.cloneDeep(schema);
  }


  constructor(private fas:FetchAllFormsService,private ds:DialogService,private ns:NavigatorService,private fs:FetchFormDetailService) {}

  ngOnInit() {
    this.fas.fetchAllComponentForms().subscribe(res => this.componentForms=res.results);

    this.ns.getRawSchema().subscribe(res => this._rawSchema = _.cloneDeep(res));
    this.fs.getReferencedFormsArray().subscribe(res => {
      if(res.length>0){
        this.refFormsArray = res;
      }
      else{
        this.refFormsArray = [];
      }
    })
  }

  insertRefForm(){
    this.ds.addDialog(InsertReferenceComponent,{forms:this.componentForms},{backdropColor:'rgba(0, 0, 0, 0.5)'})
    .subscribe((selectedForms) => {
      
      if(selectedForms) {
            this.refForm.formName = selectedForms['form'].substring(selectedForms['form'].indexOf(' ')+1)
            this.refForm.alias = selectedForms['alias'];
            this.refForm.ref['display'] = selectedForms['display'];
            this.refForm.ref['uuid'] = selectedForms['form'].substring(0,selectedForms['form'].indexOf(' '))
            this.addReferenceForm(this.refForm);
      }
    })
  }


  addReferenceForm(refForm:ReferenceForms){
      if(this._schema.referencedForms) {
        this._schema.referencedForms.push(refForm);
        this._rawSchema.referencedForms.push(refForm);
        this.fs.setReferencedForms(this._schema.referencedForms);
      }
      else {
        let newOrderedSchema={}
        newOrderedSchema['name'] = this._schema.name;
        newOrderedSchema['uuid'] = this._schema.uuid;
        newOrderedSchema['processor'] = this._schema.processor;
        newOrderedSchema['referencedForms'] = [refForm]
        newOrderedSchema['pages'] = this._schema.pages;
        this._schema = newOrderedSchema;

       
        newOrderedSchema['name'] = this._rawSchema.name;
        newOrderedSchema['uuid'] = this._rawSchema.uuid;
        newOrderedSchema['processor'] = this._rawSchema.processor;
        newOrderedSchema['referencedForms'] = [refForm];
        newOrderedSchema['pages'] = this._rawSchema.pages;
        this._rawSchema = newOrderedSchema;

        this.fs.setReferencedForms(newOrderedSchema['referencedForms']);
        
      }


      this.fs.fetchReferencedFormSchemas([refForm]).then(res => {
        this.refFormsArray.push(res[0]);
        this.fs.setReferencedFormsArray(this.refFormsArray);
        this.ns.setSchema(this._schema);
        this.ns.setRawSchema(this._rawSchema);
      })
      

  }

    display(form){
      let strForm = JSON.stringify(form,null,"\t");
      this.ds.addDialog(SchemaModalComponent,{schema:strForm,title:"Form"},{backdropColor: 'rgba(0,0,0,0.5)'})
    }

}
