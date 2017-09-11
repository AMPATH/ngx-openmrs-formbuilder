import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import  { Subject, Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import {Constants} from './constants'
@Injectable()
export class FetchAllFormsService {

 private headers = new Headers();
 private forms:any={}
 private baseUrl:string;
  
  constructor(private http:Http,private sessionStorageService:SessionStorageService) {

    let credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    this.baseUrl = sessionStorage.getItem(Constants.BASE_URL);
    this.headers.append("Authorization", "Basic " + credentials);
    this.headers.append("Content-Type", "application/json");
   }
   
   


   fetchAllPOCForms(){
    
    return this.http.get(`${this.baseUrl}/ws/rest/v1/form?q=POC&v=custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference))`,{headers:this.headers}).map(
      data => this.forms = data.json())
      .catch(e => {alert("Error found"+e); return e;})
      
   }


  fetchAllComponentForms(){
    return this.http.get(`https://test2.ampath.or.ke:8443/amrs/ws/rest/v1/form?q=Component&v=custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference))`,{headers:this.headers}).map(
      data => this.forms = data.json())
      .catch(e => {alert("Error found"+e); return e;})
  }

   
}
