
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable ,  Subject } from 'rxjs';
import { SessionStorageService } from '../storage/session-storage.service';
import {Constants} from '../constants';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
@Injectable()
export class EncounterTypeService {

 private headers = new Headers();
 private credentials: string;
 private baseUrl: string;

  constructor(private http: Http,private sessionStorageService: SessionStorageService, private router: Router) {

    this.credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    this.baseUrl = sessionStorage.getItem(Constants.BASE_URL);
    this.headers.append('Authorization', 'Basic ' + this.credentials);

   }


   getEncounterTypes() {

    return this.http.get(`${this.baseUrl}/ws/rest/v1/encountertype`, { headers: this.headers}).pipe(map((res) => res.json()));
   }
  }
