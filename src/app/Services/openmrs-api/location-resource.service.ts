import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../storage/session-storage.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LocationResourceService {
  private baseUrl: string;
  private rest_endpoint = '/ws/rest/v1/location';
  private rest_url;
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private sessionStorageService: SessionStorageService
  ) {
    auth.getBaseUrl().subscribe((baseUrl) => {
      this.baseUrl = baseUrl;
      this.rest_url = this.baseUrl + this.rest_endpoint;
    });
  }

  getAllLocations() {
    return this.http.get(this.rest_url).pipe(
      catchError((error) => {
        console.error(error);
        return error;
      })
    );
  }
}
