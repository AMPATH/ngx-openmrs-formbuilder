import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import {Constants} from './constants';
import { AuthenticationService } from './authentication.service';
import { SessionStorageService } from './session-storage.service';
import { FetchFormDetailService } from './fetch-form-detail.service';
import { LocalStorageService } from './local-storage.service';
import { Subject, Observable, BehaviorSubject} from 'rxjs';
import { FormListService } from './form-list.service';

@Injectable()
export class FetchAllFormsService {

 private headers = new Headers();
 private forms = {};
 private baseUrl: string;
 private formType: BehaviorSubject<string>= new BehaviorSubject('');
 private allPOCFormsSchemas: BehaviorSubject<any>;
 public resaveAllPOCSchemasToLocalStorage: BehaviorSubject<boolean>= new BehaviorSubject(false);

constructor(private http: Http,
  private sessionStorageService: SessionStorageService,
  private ls: LocalStorageService,
  private router: Router,
  private auth: AuthenticationService,
  private fd: FetchFormDetailService,
  private formListService: FormListService) {

  private fd: FetchFormDetailService) {

  this.allPOCFormsSchemas = new BehaviorSubject(ls.getObject('POC_FORM_SCHEMAS'));
  auth.getBaseUrl().subscribe((baseUrl) => this.baseUrl = baseUrl);
  auth.getCredentialsSubject().subscribe((credentials) => {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Basic ' + credentials);
  });
  this.headers.append('Content-Type', 'application/json');
              }


   fetchAllPOCForms() {

    const v = 'custom:(uuid,name,encounterType:(uuid,name),version,published,retired,resources:(uuid,name,dataType,valueReference))';
    return this.http.get(`${this.baseUrl}/ws/rest/v1/form?q=POC&v=${v}`, {headers: this.headers}).map(
      data => this.forms = data.json())
      .catch((e) => {
        if (e.status === 0) {
          alert('Please check that you have internet connection and CORS is turned on then refresh.');
        } else if ( e.status === 403) {
          this.router.navigate(['/login']);
        }
        return e;
      });

   }


  fetchAllComponentForms() {
    const v = 'custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference)';
    return this.http
    .get(`${this.baseUrl}/ws/rest/v1/form?q=Component&v=${v})`, {headers: this.headers}).map(
      data => this.forms = data.json())
      .catch((e) => {
        if (e.status === 0) {
          alert('Please check that you have internet connection and CORS is turned on then refresh.');
        } else if ( e.status === 403) {
          this.router.navigate(['/login']);
        }
        return e;
      });
  }

  setFormType(form: string) {
    this.formType.next(form);
  }

  getFormType() {
    return this.formType;
  }

  setPOCFormSchemas(schemas: any) {
    this.allPOCFormsSchemas.next(schemas);
  }

  getPOCFormSchemas() {
    return this.allPOCFormsSchemas;
  }

  getPOCSameFormsDifferentVersions(formMetadata: any): Observable<any[]> {
    const sameFormsDifferentVersion = [];
    return this.fetchAllPOCForms().switchMap((POCForms: any) => {
      const forms = _.cloneDeep(POCForms.results); // currently only poc forms version 1
      const formName = this.formListService.removeVersionInformation(formMetadata.name);
      const formsWithoutVersionedNames = this.formListService.removeVersionInformationFromForms(forms);
      formsWithoutVersionedNames.forEach(($form) => {
        if ($form.name === formName) {
          sameFormsDifferentVersion.push($form);
        }
      });

      return Observable.of(sameFormsDifferentVersion);
  });
}


getLatestPublishedVersion(sameFormsDifferentVersion: any[], formUuidToBePublished: any) {
  let form: any = {};
  if (!_.isEmpty(sameFormsDifferentVersion)) {
    sameFormsDifferentVersion.forEach((_form) => {
      if (_form.published && _form.uuid !== formUuidToBePublished) {
        form = _form; }});
    return form;
}}}
  // fetchAllPOCFormsSchemas(metadatas:any){
  //   let promises:Promise<any>[] = []
  //   // _.each(metadatas,(metadata:any) => {
  //   //   if(!_.isEmpty(metadata.resources))
  //   //   if(metadata.resources[0].valueReference)
  //   //   promises.push(this.fd.fetchForm(metadata.resources[0].valueReference,true))
  //   // });

  //   // return Promise.all(promises);
  //   _.forEach((metadatas),(formMetadata:any,index,form) =>{
  //     let count = 0;
  //     let schemas = [];
  //     let numberOfPOCForms = formMetadata.length;
  //     let date = Date.now();
  //     if(formMetadata.resources.length>0&&formMetadata.resources[0].valueReference)
  //     this.fd.fetchForm(formMetadata.resources[0].valueReference,true).then((schema) => {
  //     count = index;
  //     schemas.push({schema:schema,metadata:formMetadata});
  //     console.log(count,numberOfPOCForms,schemas.length);
  //     if(count == numberOfPOCForms-1) {
  //       //this.fetchAllFormsService.setAllPOCFormSchemas(schemas);
  //       this.ls.setObject("POC_FORM_SCHEMAS",schemas);
  //       let finishTime = (new Date().getTime() - date)/1000;
  //       console.log("Done fetching schemas. Took " + finishTime + "seconds");
  //     }
  //     });

  //   });
  // }

