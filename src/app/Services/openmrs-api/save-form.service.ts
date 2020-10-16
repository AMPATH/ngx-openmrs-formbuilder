import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionStorageService } from '../storage/session-storage.service';
import { Constants } from '../constants';

import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SaveFormService {
  private data = {};
  private headers = new HttpHeaders();
  private baseUrl = '';
  private newValueReference: Subject<string> = new Subject();
  private newResourceUUID: Subject<string> = new Subject();
  private newUUID: Subject<string> = new Subject();
  private formName: Subject<string> = new Subject();
  private newVersion: Subject<string> = new Subject();
  private newDescription: Subject<string> = new Subject();
  private newEncounterType: Subject<string> = new Subject();
  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    this.baseUrl = sessionStorageService.getItem(Constants.BASE_URL);
    this.headers.append('Content-Type', 'application/json');
  }

  deleteClobData(valueReference: string) {
    return this.http
      .delete(`${this.baseUrl}/ws/rest/v1/clobdata/${valueReference}`, {
        headers: this.headers
      })
      .toPromise();
  }

  deleteResource(formUUID, resourceUUID) {
    return this.http
      .delete(
        `${this.baseUrl}/ws/rest/v1/form/${formUUID}/resource/${resourceUUID}`,
        { headers: this.headers }
      )
      .toPromise();
  }

  // returns the new value reference
  uploadSchema(schema) {
    const schemaBlob = new Blob([JSON.stringify(schema)], {
      type: 'application/json'
    });
    const body = new FormData();
    body.append('file', schemaBlob);
    return this.http.post(`${this.baseUrl}/ws/rest/v1/clobdata`, body, {
      headers: this.headers,
      responseType: 'text'
    });
  }

  // returns the new resource uuid
  getResourceUUID(formUUID, valueReference) {
    const body = {
      name: 'JSON schema',
      dataType: 'AmpathJsonSchema',
      valueReference: valueReference
    };
    return this.http.post(
      `${this.baseUrl}/ws/rest/v1/form/${formUUID}/resource`,
      body,
      { headers: this.headers, responseType: 'text' }
    );
  }

  // called when creating a new form/new version of a form. Returns new formUuid and valueReference. after this call getResourceUUID
  saveNewForm(name, version, published?, description?, encounterType?) {
    const body = {
      name: name,
      version: version,
      published: published || false,
      description: description || ''
    };
    if (encounterType) {
      body['encounterType'] = encounterType;
    }
    return this.http
      .post(`${this.baseUrl}/ws/rest/v1/form`, body, { headers: this.headers })
      .pipe(map((res) => JSON.parse(JSON.stringify(res))));
  }

  //////////// get and set new resource uuid and valueReference ////////
  setNewValueReference(valueReference) {
    this.newValueReference.next(valueReference);
  }

  getNewValueReference() {
    return this.newValueReference.asObservable();
  }

  setNewResourceUUID(newResourceUUID) {
    this.newResourceUUID.next(newResourceUUID);
  }

  getNewResourceUUID() {
    return this.newResourceUUID.asObservable();
  }

  getNewEncounterType() {
    return this.newEncounterType.asObservable();
  }
  setNewFormUUID(newUUID) {
    this.newUUID.next(newUUID);
  }
  getNewFormUUID() {
    return this.newUUID.asObservable();
  }

  setNewFormName(name: string) {
    return this.formName.next(name);
  }

  getNewFormName() {
    return this.formName.asObservable();
  }

  setNewVersion(version: string) {
    return this.newVersion.next(version);
  }

  getNewVersion() {
    return this.newVersion.asObservable();
  }

  setNewDescription(description: string) {
    return this.newDescription.next(description);
  }

  getNewDescription() {
    return this.newDescription.asObservable();
  }

  publish(uuid) {
    const body = { published: true };
    return this.http.post(`${this.baseUrl}/ws/rest/v1/form/${uuid}`, body, {
      headers: this.headers
    });
  }

  unpublish(uuid) {
    const body = { published: false };
    return this.http.post(`${this.baseUrl}/ws/rest/v1/form/${uuid}`, body, {
      headers: this.headers
    });
  }

  updateName(name: string, uuid) {
    const body = { name: name };
    this.setNewFormName(name);
    return this.http.post(`${this.baseUrl}/ws/rest/v1/form/${uuid}`, body, {
      headers: this.headers
    });
  }

  updateVersion(version: string, uuid) {
    const body = { version: version };
    this.setNewVersion(version);
    return this.http.post(`${this.baseUrl}/ws/rest/v1/form/${uuid}`, body, {
      headers: this.headers
    });
  }

  updateDescription(description: string, uuid) {
    const body = { description: description };
    this.setNewDescription(description);
    return this.http.post(`${this.baseUrl}/ws/rest/v1/form/${uuid}`, body, {
      headers: this.headers
    });
  }

  updateEncounterType(encounterType: any, formUuid: string) {
    const body = { encounterType: encounterType.uuid };
    this.newEncounterType.next(encounterType.display);
    return this.http.post(`${this.baseUrl}/ws/rest/v1/form/${formUuid}`, body, {
      headers: this.headers
    });
  }
}
