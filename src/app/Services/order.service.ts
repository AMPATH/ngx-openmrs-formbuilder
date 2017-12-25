import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { SessionStorageService } from './storage/session-storage.service';
import {Constants} from '../Services/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/of';
import * as _ from 'lodash';
interface ConceptUuid {
    uuid: string;
    conceptDetails: any;
}
@Injectable()
export class OrderService {

 private data: any = {};
 private headers = new Headers();
 private baseUrl = '';

 constructor(private http: Http, private sessionStorageService: SessionStorageService) {
    const credentials = sessionStorageService.getItem(Constants.CREDENTIALS_KEY);
    this.baseUrl = sessionStorageService.getItem(Constants.BASE_URL);
    this.headers.append('Authorization', 'Basic ' + credentials);
    this.headers.append('Content-Type', 'application/json');
 }

 public searchOrder(orderID: string): Observable<any> {

// searching with concept display
        return this.http
        .get(`${this.baseUrl}/ws/rest/v1/order?q=${orderID}`,
        {headers: this.headers}).map(data => this.data = data.json())
        .catch((error) => {alert(error.message); return Observable.of(error.json()); });
 }


 public searchOrderByUUID(orderUUID: string): Observable<any> {
    return this.http
    .get(`${this.baseUrl}/ws/rest/v1/order/${orderUUID}?`,
    {headers: this.headers}).map(
        data => this.data = data.json())
    .catch((error: Response) => { console.error(error.status); return Observable.of(error.json()); });
 }

}
