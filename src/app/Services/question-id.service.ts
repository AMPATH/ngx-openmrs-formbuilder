import { Injectable } from '@angular/core';
import { NavigatorService } from './navigator.service';
import { FetchFormsService } from './fetch-forms.service';
import {Observable} from 'rxjs';

@Injectable()
export class QuestionIdService {

  private IDs=[]
  
  constructor() {}

    getIDs(schema){
      return this.collectIDs(schema);
   }

  
  
  private collectIDs(schema){
        if(schema.pages!=null) this.collectIDs(schema.pages);
        if(Array.isArray(schema)){
            schema.forEach(element => {
                if(element.sections) this.collectIDs(element.sections)
                if(element.questions) this.collectIDs(element.questions)
                else {
                if(element.id!=undefined){
                  this.IDs.push(element.id)
                }
            }
        })  }

        return this.IDs;
    }

}
