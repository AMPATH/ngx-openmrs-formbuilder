import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { SessionStorageService } from '../storage/session-storage.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class PatientResourceService {
  private credentials: any;
  private baseUrl: string;
  private rest_endpoint = '/ws/rest/v1/patient';
  private rest_url;
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private sessionStorageService: SessionStorageService
  ) {
    this.credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    auth.getBaseUrl().subscribe((baseUrl) => {
      this.baseUrl = baseUrl;
      this.rest_url = this.baseUrl + this.rest_endpoint;
    });
  }

  searchPatientByName(name: string) {
    const url = `${this.rest_url}?q=${name}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error(error);
        return error;
      })
    );
  }

  public searchPatientByUuid(uuid: string): Observable<any> {
    const url = `${this.rest_url}/${uuid}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      })
    );
  }
}
