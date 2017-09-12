import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import  { Subject, Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import {Constants} from './constants';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class FetchAllFormsService {

 private headers = new Headers();
 private forms:any={}
 private baseUrl:string;
  
  constructor(private http:Http,private sessionStorageService:SessionStorageService,private router:Router, private auth:AuthenticationService) {

  auth.getBaseUrl().subscribe((baseUrl) => this.baseUrl = baseUrl)
  auth.getCredentialsSubject().subscribe((credentials) => { 
    this.headers.delete("Authorization");
    this.headers.append("Authorization", "Basic " + credentials);
  });
  this.headers.append("Content-Type", "application/json");
 
    
   }
   
   


   fetchAllPOCForms(){

    return this.http.get(`${this.baseUrl}/ws/rest/v1/form?q=POC&v=custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference))`,{headers:this.headers}).map(
      data => this.forms = data.json())
      .catch(e => {alert("Error found: "+e.message); return e;});
      
   }


  fetchAllComponentForms(){
    return this.http.get(`https://test2.ampath.or.ke:8443/amrs/ws/rest/v1/form?q=Component&v=custom:(uuid,name,encounterType:(uuid,name),version,published,resources:(uuid,name,dataType,valueReference))`,{headers:this.headers}).map(
      data => this.forms = data.json())
      .catch(e => {alert("Error found: "+e.message); return e;})
  }

   
}
