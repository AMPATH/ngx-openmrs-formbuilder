import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FetchFormsService {

  constructor(private http: Http) { }

  schema:any;

  fetchForm(name:string):Observable<any>{
    return this.http.get(`../../assets/${name}`)
    .map(res=> res.json())
  }

  search(term:string):Observable<string[]>{
    return this.http
    .get(`../../assets/${term}`)
    .map(response => response.json().data as string[]);
  }

}
