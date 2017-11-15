import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { SessionStorageService } from './session-storage.service';
import {Constants} from '../Services/constants';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
interface ConceptUuid {
    uuid: string;
    conceptDetails: any;
}
@Injectable()
export class ConceptService {

 private data: any = {};
 private headers = new Headers();
 private baseUrl = '';

 constructor(private http: Http, private sessionStorageService: SessionStorageService) {
    const credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    this.baseUrl = sessionStorageService.getItem(Constants.BASE_URL);
    this.headers.append('Authorization', 'Basic ' + credentials);
    this.headers.append('Content-Type', 'application/json');
 }

 public searchConcept(conceptID: string): Observable<any> {

// searching with concept display
        return this.http
        .get(`${this.baseUrl}/ws/rest/v1/concept?q=${conceptID}&v=custom:(uuid,name,conceptClass,setMembers,answers,datatype)`,
        {headers: this.headers}).map(data => this.data = data.json())
        .catch((error) => {alert(error.message); return Observable.of(error.json()); });
 }


 public searchConceptByUUID(conceptUUID: string): Observable<any> {
    return this.http
    .get(`${this.baseUrl}/ws/rest/v1/concept/${conceptUUID}?v=custom:(uuid,name,conceptClass,setMembers,answers,datatype)`,
    {headers: this.headers}).map(
        data => this.data = data.json())
    .catch((error: Response) => { console.error(error.status); return Observable.of(error.json()); });
 }

 public validateConcepts(conceptUuids: any) {
        const observablesArray = [];
     _.each((conceptUuids), (conceptUuid) => {
        observablesArray.push(this.searchConceptByUUID(conceptUuid).map((concept) => {
            if (concept.error) { return conceptUuid; }
        })
        .catch((error) => {
            return error;
        }));
     });
     return Observable.forkJoin(observablesArray);
 }

}
