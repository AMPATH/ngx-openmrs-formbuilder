import { of as observableOf, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './storage/session-storage.service';
import { Constants } from '../Services/constants';

import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface ConceptUuid {
  uuid: string;
  conceptDetails: any;
}
@Injectable()
export class OrderService {
  private data: any = {};
  private headers = new HttpHeaders();
  private baseUrl = '';

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    this.baseUrl = sessionStorageService.getItem(Constants.BASE_URL);
    this.headers.append('Content-Type', 'application/json');
  }

  public searchOrder(orderID: string): Observable<any> {
    // searching with concept display
    return this.http
      .get(`${this.baseUrl}/ws/rest/v1/order?q=${orderID}`, {
        headers: this.headers
      })
      .pipe(
        catchError((error) => {
          alert(error.message);
          return observableOf(error.json());
        })
      );
  }

  public searchOrderByUUID(orderUUID: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/ws/rest/v1/order/${orderUUID}?`, {
        headers: this.headers
      })
      .pipe(
        catchError((error: Response) => {
          console.error(error.status);
          return observableOf(error.json());
        })
      );
  }
}
