import { Injectable } from '@angular/core';
import  { Subject, Observable } from 'rxjs';

@Injectable()
export class NavigatorService {

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

 setRawSchema(rawSchema:{}){
   this.rawSchema = rawSchema;
   this.rawSchemaSubject.next(rawSchema);
 }

 getRawSchema(){
   return this.rawSchemaSubject.asObservable()
 }

}
