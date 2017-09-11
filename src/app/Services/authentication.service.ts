import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { SessionService } from './session.service';
import { SessionStorageService } from './session-storage.service';
import { Constants } from './constants';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthenticationService {

  constructor(
    private sessionStorageService: SessionStorageService,
    private sessionService: SessionService) { }

  public authenticate(username: string, password: string, baseUrl: string) {

    let credentials = {
      username: username,
      password: password
    };

    let request = this.sessionService.getSession(credentials, baseUrl);

    request.subscribe((response: Response) => {
        let data = response.json();
        if (data.authenticated) {
          this.setCredentials(username, password,baseUrl);
          // store logged in user details in session storage
          let user = data.user;
          this.storeUser(user);
        }
      });

    return request;
  }

  public logOut() {

    let response = this.sessionService.deleteSession();

    response
      .subscribe(
      (res: Response) => {

        this.clearSessionCache();
      },
      (error: Error) => {

        this.clearSessionCache();
      });

    return response;
  }

  public clearSessionCache() {
    this.clearCredentials();
    this.clearUserDetails();
  }
 
  private setCredentials(username: string, password: string, baseUrl:string) {

    let base64 = btoa(username + ':' + password);
    this.sessionStorageService.setItem(Constants.CREDENTIALS_KEY, base64);
    this.sessionStorageService.setItem(Constants.BASE_URL, baseUrl);
  }

  private clearCredentials() {

    this.sessionStorageService.remove(Constants.CREDENTIALS_KEY);
  }

  private storeUser(user: any) {
    this.sessionStorageService.setObject(Constants.USER_KEY, user);
  }

  private clearUserDetails() {
    this.sessionStorageService.remove(Constants.USER_KEY);
  }
}
