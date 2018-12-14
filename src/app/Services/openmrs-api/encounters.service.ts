
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../storage/session-storage.service';
import { Constants } from '../constants';

@Injectable()
export class EncounterService {

    private baseUrl;
    private credentials;
    private restUrl;
    private headers: Headers = new Headers();
    constructor(private http: Http, private sessionStorageService: SessionStorageService) {
        this.credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
        this.baseUrl = sessionStorage.getItem(Constants.BASE_URL);
        this.restUrl = this.baseUrl + '/ws/rest/v1/encounter';
        this.headers.delete('Authorization');
        this.headers.append('Content-Type' , 'application/json');
        this.headers.append('Authorization', 'Basic ' + this.credentials);
    }

    getEncounterByUuid(encounterUuid: string) {
        let v = 'custom:(uuid,encounterDatetime,' +
        'patient:(uuid,uuid,identifiers),form:(uuid,name),' +
        'visit:(uuid,visitType,display,startDatetime,stopDatetime),' +
        'location:ref,encounterType:ref,encounterProviders,orders:full,' +
        'obs:(uuid,obsDatetime,concept:(uuid,uuid,name:(display)),value:ref,groupMembers))';
        if (!encounterUuid) {return null; }
        return this.http.get(`${this.restUrl}/${encounterUuid}?v=${v}`, {headers: this.headers}).pipe(
        map((response) => response.json()));
    }

    public getEncountersByPatientUuid(patientUuid: string): Observable<any> {
        if (!patientUuid) { return null; }
        const params = new URLSearchParams();
        params.set('patient', patientUuid);
        return this.http.get(this.restUrl + '?patient=' + patientUuid, {headers: this.headers}).pipe(
                        map((response) => response.json().results));
    }

    saveEncounter(payload: any) {
        if (!payload) {
            return null;
        }
        return this.http.post(this.restUrl, JSON.stringify(payload), {headers: this.headers}).pipe(
            map((response) => {
                return response.json();
            }));
    }
}
