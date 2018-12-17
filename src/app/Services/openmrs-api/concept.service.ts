
import {forkJoin as observableForkJoin, of as observableOf, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../storage/session-storage.service';
import {Constants} from '../constants';

import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface ConceptUuid {
    uuid: string;
    conceptDetails: any;
}
@Injectable()
export class ConceptService {

 private data: any = {};
 private headers = new HttpHeaders();
 private baseUrl = '';

 constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {
    const credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    this.baseUrl = sessionStorageService.getItem(Constants.BASE_URL);
    this.headers.append('Content-Type', 'application/json');
 }

 public searchConceptByName(conceptID: string): Observable<any> {

        // searching with concept display
        return this.http
        .get(`${this.baseUrl}/ws/rest/v1/concept?q=${conceptID}&v=full`,
        {headers: this.headers}).pipe(
        catchError((error) => {alert(error.message); return observableOf(error.json()); }));
 }


 public searchConceptByUUID(conceptUUID: string): Observable<any> {

    return this.http
    .get(`${this.baseUrl}/ws/rest/v1/concept/${conceptUUID}?v=full`,
    {headers: this.headers}).pipe(
    catchError((error: Response) => { console.error(error.status); return observableOf(error.json()); }));
 }

 public validateConcepts(conceptUuids: any) {
        const observablesArray = [];
     _.each((conceptUuids), (conceptUuid) => {
        observablesArray.push(this.searchConceptByUUID(conceptUuid).pipe(map((concept) => {
            if (concept.error) { return conceptUuid; }
        }),
        catchError((error) => {
            return error;
        })));
     });
     return observableForkJoin(observablesArray);
 }



 public createMappingsValue(mappings): any[] {
    const props = [];
    _.forEach(mappings, (mapping) => {
        const type = mapping.display.substring(0, mapping.display.indexOf(':'));
        const value = mapping.display.substring(mapping.display.indexOf(' ') + 1);
        props.push({ type: type, value: value });
    });
    return props;
  }

  public getConceptID(conceptUuid: string): Observable<any> {
    return this.http
    .get(`https://ngx.ampath.or.ke/concept-server/api/${conceptUuid}`).pipe(
    catchError((error: Response) => { console.error(error.status); return observableOf(error.json()); }));
  }

  public getAllConcepts() {
    return this.http
    .get(`${this.baseUrl}/ws/rest/v1/concept?v=full`,
    {headers: this.headers}).pipe(
    catchError((error: Response) => { console.error(error.status); return observableOf(error.json()); }));
  }

}
