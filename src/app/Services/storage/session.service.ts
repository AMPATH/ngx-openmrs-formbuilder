import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { Constants } from '../constants';

@Injectable()
export class SessionService {
  private sessionUrl;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  public getUrl(): string {
    return this.sessionUrl;
  }

  public getSession(credentials: any = null, baseUrl: string) {
    this.sessionUrl = baseUrl + '/ws/rest/v1/session';

    if (credentials && credentials.username) {
      const base64 = btoa(credentials.username + ':' + credentials.password);
      this.sessionStorageService.setItem(Constants.CREDENTIALS_KEY, base64);
    }

    return this.http.get(this.sessionUrl);
  }

  public deleteSession() {
    const url = this.getUrl();
    this.sessionStorageService.clear();
    return this.http.delete(url, {});
  }
}
