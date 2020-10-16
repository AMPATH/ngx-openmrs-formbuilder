import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';
// TODO inject service

@Injectable()
export class SessionService {
  private url;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  public getUrl(): string {
    return this.url;
  }

  public getSession(credentials: any = null, baseUrl: string) {
    this.url = baseUrl + '/ws/rest/v1/session';
    if (credentials && credentials.username) {
      const base64 = btoa(credentials.username + ':' + credentials.password);
      this.sessionStorageService.setItem(Constants.CREDENTIALS_KEY, base64);
    }

    return this.http.get(this.url).pipe(
      catchError((error) => {
        console.log(error);
        return error;
      })
    );
  }

  public deleteSession() {
    const url = this.getUrl();
    console.log(this.url);
    this.sessionStorageService.clear();
    return this.http.delete(url, {});
  }
}
