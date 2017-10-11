import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {FormSchemaCompiler} from 'ng2-openmrs-formentry';
import {NavigatorService} from './navigator.service';
import {SessionStorageService} from './session-storage.service';
import {Constants} from './constants';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FetchFormDetailService {

  private schema: Object = {}
  private referencedForms: Array < Object >= []
  private _rawSchema: Object = {}
  private referencedFormsSubject: BehaviorSubject < any[] >= new BehaviorSubject([])
  private referencedFormsDetailsSubject: BehaviorSubject < any[] > = new BehaviorSubject < any[] > ([]) //formName,alias,uuid
  private headers: Headers = new Headers();
  private baseUrl: string = ''
  private formEditorLoaded: BehaviorSubject < boolean > = new BehaviorSubject(false);
  private credentials: string;

  constructor(private http: Http, private fsc: FormSchemaCompiler, private router: Router, private ns: NavigatorService, private sessionStorageService: SessionStorageService) {
    this.credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    this.baseUrl = sessionStorage.getItem(Constants.BASE_URL);
    console.warn(this.baseUrl,"BASE URL");
    this.headers.append("Authorization", "Basic " + this.credentials);
    // this.headers.append( 'Content-Type', 'application/json');
  }



  public fetchFormMetadata(uuid: string, isComponent: boolean) {
    if (this.baseUrl == null || this.credentials == null) {
      this.router.navigate(['/login']);
    } else return this.http.get(`${this.baseUrl}/ws/rest/v1/form/${uuid}?v=full`, {
        headers: this.headers
      })
      .map(metadata => {
       
        return metadata.json();
      })
      .catch(error => {
        console.log("Error:" + error)
        return error;
      })
      .toPromise()
  }

  public fetchForm(valueReference: string, isReferenceForm: boolean) {
    let arr;
    return this.http.get(`${this.baseUrl}/ws/rest/v1/clobdata/${valueReference}`, {
        headers: this.headers
      })
      .map((res) => {


          if (!isReferenceForm) {
            this._rawSchema = res.json();
          }

          if (res.json().referencedForms) {

            this.setReferencedForms(res.json().referencedForms);
            return this.fetchReferencedFormSchemas(res.json().referencedForms).then(referencedForms => {
              this.referencedFormsSubject = new BehaviorSubject(referencedForms)
              try {
                this.schema = this.fsc.compileFormSchema(res.json(), referencedForms);
              } catch (e) {
                console.error("Cannot find some reference forms!")
                this.schema = {};
              }

              return this.schema;
            });

          } else {
            return res.json();
          }


        }

      )
      .toPromise();

  }



  fetchReferencedFormSchemas(referencedForms: any[]) {
    let apiCalls = [];
    referencedForms.forEach(form => {
      apiCalls.push(this.fetchFormMetadata(form.ref.uuid, true).then(res => this.fetchForm(res.resources[0].valueReference, true)))
    });
    return Promise.all(apiCalls)
  }




  get rawSchema() {
    return this._rawSchema;
  }


  setReferencedFormsArray(array: any[]) {
    this.referencedForms = array;
    this.referencedFormsSubject.next(array)
  }


  getReferencedFormsArray() {
    return this.referencedFormsSubject.asObservable();
  }

  public fetchReferencedForms() {
    return this.referencedFormsDetailsSubject.asObservable();

  }

  setReferencedForms(formDits) { //formName,alias,uuid
    this.referencedFormsDetailsSubject.next(formDits)
  }

  setLoaded(bool: boolean) {
    this.formEditorLoaded.next(true);
  }

  loaded() {
    return this.formEditorLoaded.asObservable();
  }


}

