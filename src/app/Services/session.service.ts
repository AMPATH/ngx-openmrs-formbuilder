import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

// TODO inject service

@Injectable()
export class SessionService {

  private url;
  
  constructor(private http: Http) {
  }

  public getUrl(): string {

    return this.url;
  }

  public getSession(credentials: any = null, baseUrl: string) {
    this.url = baseUrl+'/ws/rest/v1/session';
    let headers = new Headers();
    if (credentials && credentials.username) {
      let base64 = btoa(credentials.username + ':' + credentials.password);
      headers.append('Authorization', 'Basic ' + base64);
    }
    
    return this.http.get(this.url, {
      headers: headers
    })
    .catch((error) =>{
      console.log(error);
      return error;
    });
  }


  public deleteSession() {
    let url = this.getUrl();
    return this.http.delete(url, {});
  }
}