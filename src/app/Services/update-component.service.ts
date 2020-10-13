import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface Data {
  componentMetadata: any;
  arrayOfFormsToUpdate: any[];
}
@Injectable()
export class UpdateComponentService {
  data: BehaviorSubject<Data> = new BehaviorSubject(undefined);
  $data = this.data.asObservable();
  constructor() {}

  setData(data: Data) {
    this.data.next(data);
  }
}
