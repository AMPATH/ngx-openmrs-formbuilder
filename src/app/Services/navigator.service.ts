import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
@Injectable()
export class NavigatorService {

  schema: {};
  subject:Subject<{}> = new Subject<{}>();

  constructor() {}

  setSelectedElement(schema){
      this.schema = schema;
      this.subject.next(schema);
  }

  getSelectedElement():Observable<{}>{
    return this.subject.asObservable()  }

}
