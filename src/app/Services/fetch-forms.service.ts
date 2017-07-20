import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FetchFormsService {

  constructor(private http: Http) { }

  schema:any;
  url = "/assets/adult.json"

  fetchAvailableForms():Observable<any>{
    return this.http.get(this.url)
    .map(res=> res.json())
  }

}
