import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Http, Headers } from '@angular/http';
import { SessionStorageService } from '../storage/session-storage.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PatientResourceService {

    private credentials: any;
    private baseUrl: string;
    private headers: Headers = new Headers();
    private rest_endpoint = '/ws/rest/v1/patient';
    private rest_url;
    constructor(private http: Http, private auth: AuthenticationService,
        private sessionStorageService: SessionStorageService) {
        this.credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
        auth.getBaseUrl().subscribe((baseUrl) => {this.baseUrl = baseUrl; this.rest_url = this.baseUrl + this.rest_endpoint;});
        this.headers.append('Authorization', 'Basic ' + this.credentials);
      }

    searchPatientByName(name: string) {
        const url = `${this.rest_url}?q=${name}`;
        return this.http.get(url, {headers: this.headers}).map((res) => res.json())
                        .catch((error) => { console.error(error); return error; });
    }

    public searchPatientByUuid(uuid: string): Observable<any> {
      const url = `${this.rest_url}/${uuid}`;
      return this.http.get(url, {headers: this.headers}).map((res) => {
        return res.json();
      })
      .catch((error) => {console.log(error); return error; });
    }
}
