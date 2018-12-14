
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {FormSchemaCompiler} from '../schema-compiler.service';
import {NavigatorService} from '../navigator.service';
import {SessionStorageService} from '../storage/session-storage.service';
import {Constants} from '../constants';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';




@Injectable()
export class FetchFormDetailService {

  private schema: any = {}
  private referencedForms: Array < Object >= []
  private _rawSchema: any = {}
  private referencedFormsSchemasSubject: BehaviorSubject < any[] >= new BehaviorSubject([])
  private referencedFormsDetailsSubject: BehaviorSubject < any[] > = new BehaviorSubject < any[] > ([]) // formName,alias,uuid
  private headers: Headers = new Headers();
  private baseUrl: string = ''
  private formEditorLoaded: BehaviorSubject < boolean > = new BehaviorSubject(false);
  private credentials: string;

  constructor(private http: Http, private fsc: FormSchemaCompiler, private router: Router, private ns: NavigatorService, 
    private sessionStorageService: SessionStorageService,private auth:AuthenticationService) {
    this.credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    auth.getBaseUrl().subscribe((baseUrl) => this.baseUrl = baseUrl);
    console.warn(this.baseUrl,'BASE URL');
    this.headers.append('Authorization', 'Basic ' + this.credentials);
    // this.headers.append( 'Content-Type', 'application/json');
  }



  public fetchFormMetadata(uuid: string, isComponent: boolean) {
   return this.http.get(`${this.baseUrl}/ws/rest/v1/form/${uuid}?v=full`, {headers: this.headers}).pipe(
      map(metadata => {return metadata.json(); }),
      catchError(error => {
        console.log('Error:' + error)
        return error;
      }),)
      .toPromise()
  }

  public fetchForm(valueReference: string, isReferenceForm: boolean) {
    let arr;
    return this.http.get(`${this.baseUrl}/ws/rest/v1/clobdata/${valueReference}`, {
        headers: this.headers
      }).pipe(
      map((res) => {


          if (!isReferenceForm) {
            this._rawSchema = res.json();
          }

          if (res.json().referencedForms&&!isReferenceForm) {

            this.setReferencedFormsDetails(res.json().referencedForms);
            return this.fetchReferencedFormSchemas(res.json().referencedForms).then(referencedForms => {
              console.log('setting ref forms')
              this.referencedFormsSchemasSubject = new BehaviorSubject(referencedForms);
              return this.fsc.compileFormSchema(res.json(), referencedForms);
            });

          } 
          
          else {
            return res.json();
          }


        }

      ))
      .toPromise();

  }



  fetchReferencedFormSchemas(referencedForms: any[]):Promise<any> {
    let apiCalls = [];
    referencedForms.forEach(form => {
      apiCalls.push(this.fetchFormMetadata(form.ref.uuid, true).then(res => this.fetchForm(res.resources[0].valueReference, true)))
    });
    return Promise.all(apiCalls)
  }

  get rawSchema() {
    return this._rawSchema;
  }

  setReferencedFormsSchemasArray(array: any[]) {
    this.referencedFormsSchemasSubject.next(array)
  }


  getReferencedFormsSchemasArray() {
    return this.referencedFormsSchemasSubject.asObservable();
  }

  getReferencedFormsDetails() {
    return this.referencedFormsDetailsSubject.asObservable();

  }

  setReferencedFormsDetails(formDits) { 
    //formName,alias,uuid
    this.referencedFormsDetailsSubject.next(formDits)
  }

  setLoaded(bool: boolean) {
    this.formEditorLoaded.next(true);
  }

  loaded() {
    return this.formEditorLoaded.asObservable();
  }

  restoreReferencedForms(schema){
    if (schema.referencedForms) {
                  this.setReferencedFormsDetails(schema.referencedForms);
                  return this.fetchReferencedFormSchemas(schema.referencedForms).then(referencedForms => {
                    this.referencedFormsSchemasSubject = new BehaviorSubject(referencedForms)
                  });
      
                }
  }

}

