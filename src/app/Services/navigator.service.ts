import { Injectable } from '@angular/core';
<<<<<<< HEAD
import  { Subject, Observable } from 'rxjs';
=======
import {Subject, Observable} from 'rxjs';
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3

@Injectable()
export class NavigatorService {

<<<<<<< HEAD
  schema: Object; //stores the state of the current schema and all the changes in memory.
  rawSchema:Object; //stores the raw version of above
  schemaEditorSubject:Subject<Object> = new Subject();
  rawSchemaEditorSubject:Subject<Object> = new Subject();
  schemaSubject:Subject<Object> = new Subject();
  questionSubject:Subject<Object> = new Subject();
  rawSchemaSubject:Subject<Object> = new Subject()
  

  constructor() {
  }

  setClickedElementSchema(schema){
      this.schemaEditorSubject.next(schema);
  }

  getClickedElementSchema():Observable<Object>{
    return this.schemaEditorSubject.asObservable();
 }

 setClickedElementRawSchema(rawSchema){
  this.rawSchemaEditorSubject.next(rawSchema)
 }

 getClickedElementRawSchema(){
  return this.rawSchemaEditorSubject.asObservable();
 }



 setSchema(schema:Object){
=======
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
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
   this.schema = schema;
   this.schemaSubject.next(schema);
 }

 getSchema(){
   return this.schemaSubject.asObservable();
 }

 newQuestion(schema:any,pageIndex:number,sectionIndex:number,questionIndex?:number,parentQuestionIndex?:number){
     let question = {}
     question['schema']=schema
     question['pageIndex']=pageIndex
     question['sectionIndex']=sectionIndex
     question['questionIndex']=questionIndex
     question['parentQuestionIndex']=parentQuestionIndex || -1 
     console.log(question)
     this.questionSubject.next(question);
 }

 getNewQuestion(){
  return this.questionSubject.asObservable();
 }

<<<<<<< HEAD
 setRawSchema(rawSchema:{}){
   this.rawSchema = rawSchema;
   this.rawSchemaSubject.next(rawSchema);
 }

 getRawSchema(){
   return this.rawSchemaSubject.asObservable()
 }

=======
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
}
