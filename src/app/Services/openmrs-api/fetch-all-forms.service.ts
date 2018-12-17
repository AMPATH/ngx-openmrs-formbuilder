
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { SessionStorageService } from '../storage/session-storage.service';
import { FetchFormDetailService } from '../openmrs-api/fetch-form-detail.service';
import { LocalStorageService } from '../storage/local-storage.service';
import { BehaviorSubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class FetchAllFormsService {

 private headers = new HttpHeaders();
 private forms = {};
 private baseUrl: string;
 private formType: BehaviorSubject<string> = new BehaviorSubject('');
 private allPOCFormsSchemas: BehaviorSubject<any>;
 public resaveAllPOCSchemasToLocalStorage: BehaviorSubject<boolean> = new BehaviorSubject(false);

constructor(private http: HttpClient,
  private sessionStorageService: SessionStorageService,
  private localStorageService: LocalStorageService,
  private router: Router,
  private authenticationService: AuthenticationService,
  private fetchFormDetailService: FetchFormDetailService) {
  this.allPOCFormsSchemas = new BehaviorSubject(localStorageService.getObject('POC_FORM_SCHEMAS'));
  authenticationService.getBaseUrl().subscribe((baseUrl) => this.baseUrl = baseUrl);
  this.headers.append('Content-Type', 'application/json');
  }


   fetchAllPOCForms() {
    const v = 'custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference))';
    return this.http.get<any>(`${this.baseUrl}/ws/rest/v1/form?q=POC&v=${v}`, {headers: this.headers}).pipe(
      catchError((e) => {
        if (e.status === 0) {
          alert('Please check that you have internet connection and CORS is turned on then refresh.');
        } else if ( e.status === 403) {
          this.router.navigate(['/login']);
        }
        return e;
      }));

   }


  fetchAllComponentForms() {
    const v = 'custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference)';
    return this.http
    .get<any>(`${this.baseUrl}/ws/rest/v1/form?q=Component&v=${v})`, {headers: this.headers}).pipe(
      catchError((e) => {
        if (e.status === 0) {
          alert('Please check that you have internet connection and CORS is turned on then refresh.');
        } else if ( e.status === 403) {
          this.router.navigate(['/login']);
        }
        return e;
      }));
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
}
