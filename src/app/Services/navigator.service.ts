import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable()
export class NavigatorService {

  schema: {};
  selectedElementSubject:Subject<{}> = new Subject<{}>();
  schemaSubject:Subject<{}> = new Subject<{}>();
  questionSubject:Subject<any> = new Subject<any>();
  

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

 newQuestion(schema:any,pageIndex:number,sectionIndex:number,questionIndex:number){
     let question = {}
     question['schema']=schema
     question['pageIndex']=pageIndex
     question['sectionIndex']=sectionIndex
     question['questionIndex']=questionIndex
     this.questionSubject.next(question);
 }

 getNewQuestion(){
  return this.questionSubject.asObservable();
 }

}
