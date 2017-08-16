import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
declare var System:any;
@Injectable()
export class ConceptService {
  
 private username : string = 'fali';
 private password : string = 'Tumtuma19';
 data:any = {}
 constructor(private http:Http){}
 
 
 searchConcept(conceptID:string):Observable<any>{


    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    headers.append("Content-Type", "application/json");

    if(conceptID.length==36&&conceptID.indexOf(' ')==-1){ //searching with concept uuid
        return this.http.get(`https://test2.ampath.or.ke:8443/amrs/ws/rest/v1/concept/${conceptID}`, {headers:headers}).map(
            data => this.data = data.json()
        );
 }
    else{ //searching with concept display
        return this.http.get(`https://test2.ampath.or.ke:8443/amrs/ws/rest/v1/concept?q=${conceptID}`,{headers:headers}).map(
            data => this.data = data.json()
        );
    }
  
 }
}
