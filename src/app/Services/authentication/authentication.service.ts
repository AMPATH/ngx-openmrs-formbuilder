import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { SessionService } from '../storage/session.service';
import { SessionStorageService } from '../storage/session-storage.service';
import { Constants } from '../constants';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {

  isLoggedIn = false;
  redirectUrl ='';
  baseUrl: BehaviorSubject<string> = new BehaviorSubject('');
  credentials: BehaviorSubject<string> = new BehaviorSubject('');


  constructor(
    private sessionStorageService: SessionStorageService,
    private sessionService: SessionService) {

      if (this.sessionStorageService.getItem(Constants.CREDENTIALS_KEY) != null
      && this.sessionStorageService.getItem(Constants.BASE_URL) != null) {
        this.setCredentialsSubjectEncrypted(this.sessionStorageService.getItem(Constants.CREDENTIALS_KEY));
        this.setBaseUrl(this.sessionStorageService.getItem(Constants.BASE_URL));
        this.isLoggedIn = true;
      }
    }

  public authenticate(username: string, password: string, baseUrl: string) {

    const credentials = {
      username: username,
      password: password
    };

    const request = this.sessionService.getSession(credentials, baseUrl);

    request.subscribe((response: Response) => {
        const data = response.json();
        if (data.authenticated) {
          this.isLoggedIn = true;
          this.setCredentials(username, password,baseUrl);
          // store logged in user details in session storage
          let user = data.user;
          this.storeUser(user);
        }

        else{
          this.isLoggedIn = false;
        }
      });

    return request;
  }

  public logOut() {
    this.isLoggedIn = false;
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

  setBaseUrl(baseUrl:string){
    this.baseUrl.next(baseUrl);
  }

  getBaseUrl(){
    return this.baseUrl.asObservable();
  }

  setCredentialsSubject(username:string,password:string){
    let base64 = btoa(username + ':' + password);
    this.credentials.next(base64);
  }

  setCredentialsSubjectEncrypted(base64:string){
    this.credentials.next(base64);
  }

  getCredentialsSubject(){
    return this.credentials.asObservable();
  }
}
