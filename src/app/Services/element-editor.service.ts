import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class ElementEditorService {

  private previouslySelectAnswers:Subject<Object> = new Subject();
  private setMembersSubject:Subject<any[]> = new Subject();
  private reshowSetMembers:Subject<any[]>=new Subject();
  constructor() { }

  reShowAnswersDialog(previouslySelected:any){
    this.previouslySelectAnswers.next(previouslySelected);
  }


  reselectAnswers(){
    return this.previouslySelectAnswers.asObservable();
  }
  
  setMembers(setMembers:any[]){
    this.setMembersSubject.next(setMembers);
  }

  getSetMembers(){
    return this.setMembersSubject.asObservable();
  }

  reShowSetMembersDialog(setMembers:any[]){
    this.reshowSetMembers.next(setMembers);
  }

  reselectSetMembers(){
    return this.reshowSetMembers.asObservable();
  }

}
