import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {FormSchemaCompiler} from 'ng2-openmrs-formentry';
import {NavigatorService} from './navigator.service'

@Injectable()
export class FetchFormsService {

  constructor(private http: Http,private fsc:FormSchemaCompiler,private ns:NavigatorService) { }

 private schema:Object={}
 private referencedForms:Array<Object>=[]
 private _rawSchema:Object={}


  public fetchForm(name:string):Observable<any>{
    return this.http.get(`../../assets/${name}.json`)
    .map((res)=> {
        if(res.json().referencedForms) {
          res.json().referencedForms.forEach(refForm =>  this.fetchReferencedFormsSchemas(refForm.formName))
          this.schema=this.fsc.compileFormSchema(res.json(),this.referencedformsSchemas)
          this._rawSchema=res.json()
          this.ns.setRawSchema(this._rawSchema); //setRawSchema
          return this.fsc.compileFormSchema(res.json(),this.referencedForms);
      }
      return res.json()
    })

      
     }

  
     get rawSchema(){
        return this._rawSchema;
     }

  private fetchReferencedFormsSchemas(formName){
    return this.fetchForm(formName).subscribe(res => this.referencedForms.push(res))
  }

  get referencedformsSchemas(){
    return this.referencedForms;
  }


  public fetchReferencedForms():any[]{
    let referencedformsdetails = [] //formName,alias,uuid
    this.schema['referencedForms'].forEach(refForm => referencedformsdetails.push(refForm))
    return referencedformsdetails;
  }


}
