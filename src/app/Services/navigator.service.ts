import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';
@Injectable()
export class NavigatorService {

  schema: {};
  selectedElementSubject:Subject<{}> = new Subject<{}>();
  schemaSubject:Subject<{}> = new Subject<{}>();
  constructor() {}

  setSelectedElement(schema){
      this.schema = schema;
      this.selectedElementSubject.next(schema);
  }

  getSelectedElement():Observable<{}>{
    return this.selectedElementSubject.asObservable();
 }

 setSchema(schema){
   this.schema = schema;
   this.schemaSubject.next(schema);
 }

 getSchema(){
   return this.schemaSubject.asObservable();
 }
}
