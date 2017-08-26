import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
<<<<<<< HEAD
import {FormSchemaCompiler} from 'ng2-openmrs-formentry';
import {NavigatorService} from './navigator.service'
=======
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3

@Injectable()
export class FetchFormsService {

<<<<<<< HEAD
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


=======
  constructor(private http: Http) { }

  schema:any;

  fetchForm(name:string):Observable<any>{
    return this.http.get(`../../assets/${name}`)
    .map(res=> res.json())
  }

  search(term:string):Observable<string[]>{
    return this.http
    .get(`../../assets/${term}`)
    .map(response => response.json().data as string[]);
  }

>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
}
