import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormSchemaCompiler } from '../schema-compiler.service';
import { NavigatorService } from '../navigator.service';
import { SessionStorageService } from '../storage/session-storage.service';
import { Constants } from '../constants';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FetchFormDetailService {
  private schema: any = {};
  private referencedForms: Array<Object> = [];
  private _rawSchema: any = {};
  private referencedFormsSchemasSubject: BehaviorSubject<
    any[]
  > = new BehaviorSubject([]);
  private referencedFormsDetailsSubject: BehaviorSubject<
    any[]
  > = new BehaviorSubject<any[]>([]); // formName,alias,uuid
  private baseUrl = '';
  private formEditorLoaded: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private credentials: string;

  constructor(
    private http: HttpClient,
    private fsc: FormSchemaCompiler,
    private router: Router,
    private ns: NavigatorService,
    private sessionStorageService: SessionStorageService,
    private auth: AuthenticationService
  ) {
    this.credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    auth.getBaseUrl().subscribe((baseUrl) => (this.baseUrl = baseUrl));
    // this.headers.append( 'Content-Type', 'application/json');
  }

  public fetchFormMetadata(uuid: string, isComponent: boolean) {
    return this.http
      .get<any>(`${this.baseUrl}/ws/rest/v1/form/${uuid}?v=full`)
      .pipe(
        catchError((error) => {
          console.log('Error:' + error);
          return error;
        })
      )
      .toPromise();
  }

  public fetchForm(valueReference: string, isReferenceForm: boolean) {
    return this.http
      .get<any>(`${this.baseUrl}/ws/rest/v1/clobdata/${valueReference}`)
      .pipe(
        map((res) => {
          if (!isReferenceForm) {
            this._rawSchema = res;
          }

          if (res.referencedForms && !isReferenceForm) {
            this.setReferencedFormsDetails(res.referencedForms);
            return this.fetchReferencedFormSchemas(res.referencedForms).then(
              (referencedForms) => {
                this.referencedFormsSchemasSubject = new BehaviorSubject(
                  referencedForms
                );
                return this.fsc.compileFormSchema(res, referencedForms);
              }
            );
          } else {
            return res;
          }
        })
      )
      .toPromise();
  }

  fetchReferencedFormSchemas(referencedForms: any[]): Promise<any> {
    const apiCalls = [];
    referencedForms.forEach((form) => {
      apiCalls.push(
        this.fetchFormMetadata(form.ref.uuid, true).then((res) =>
          this.fetchForm(res.resources[0].valueReference, true)
        )
      );
    });
    return Promise.all(apiCalls);
  }

  get rawSchema() {
    return this._rawSchema;
  }

  setReferencedFormsSchemasArray(array: any[]) {
    this.referencedFormsSchemasSubject.next(array);
  }

  getReferencedFormsSchemasArray() {
    return this.referencedFormsSchemasSubject.asObservable();
  }

  getReferencedFormsDetails() {
    return this.referencedFormsDetailsSubject.asObservable();
  }

  setReferencedFormsDetails(formDits) {
    // formName,alias,uuid
    this.referencedFormsDetailsSubject.next(formDits);
  }

  setLoaded(bool: boolean) {
    this.formEditorLoaded.next(true);
  }

  loaded() {
    return this.formEditorLoaded.asObservable();
  }

  restoreReferencedForms(schema) {
    if (schema.referencedForms) {
      this.setReferencedFormsDetails(schema.referencedForms);
      return this.fetchReferencedFormSchemas(schema.referencedForms).then(
        (referencedForms) => {
          this.referencedFormsSchemasSubject = new BehaviorSubject(
            referencedForms
          );
        }
      );
    }
  }
}
