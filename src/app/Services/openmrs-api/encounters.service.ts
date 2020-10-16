import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../storage/session-storage.service';
import { Constants } from '../constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EncounterService {
  private baseUrl;
  private restUrl;
  private headers = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    this.baseUrl = sessionStorage.getItem(Constants.BASE_URL);
    this.restUrl = this.baseUrl + '/ws/rest/v1/encounter';
    this.headers.append('Content-Type', 'application/json');
  }

  getEncounterByUuid(encounterUuid: string) {
    const v =
      'custom:(uuid,encounterDatetime,' +
      'patient:(uuid,uuid,identifiers),form:(uuid,name),' +
      'visit:(uuid,visitType,display,startDatetime,stopDatetime),' +
      'location:ref,encounterType:ref,encounterProviders,orders:full,' +
      'obs:(uuid,obsDatetime,concept:(uuid,uuid,name:(display)),value:ref,groupMembers))';
    if (!encounterUuid) {
      return null;
    }
    return this.http.get<any>(`${this.restUrl}/${encounterUuid}?v=${v}`, {
      headers: this.headers
    });
  }

  public getEncountersByPatientUuid(patientUuid: string): Observable<any> {
    if (!patientUuid) {
      return null;
    }
    const params = new URLSearchParams();
    params.set('patient', patientUuid);
    return this.http
      .get<any>(this.restUrl + '?patient=' + patientUuid, {
        headers: this.headers
      })
      .pipe(map((response) => response.results));
  }

  saveEncounter(payload: any) {
    if (!payload) {
      return null;
    }
    return this.http.post<any>(this.restUrl, JSON.stringify(payload), {
      headers: this.headers
    });
  }
}
