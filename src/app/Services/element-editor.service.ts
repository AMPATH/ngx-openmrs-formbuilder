import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class ElementEditorService {

  private previouslySelectAnswers:Subject<Object> = new Subject();
  constructor() { }

  reShowAnswersDialog(previouslySelected:any){
    this.previouslySelectAnswers.next(previouslySelected);
  }


  reselectAnswers(){
    return this.previouslySelectAnswers.asObservable();
  }
  

}
