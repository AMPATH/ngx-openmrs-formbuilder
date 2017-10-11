import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
@Injectable()
export class QuestionIdService {

  private IDs=[]
  
  constructor() {}

    getIDs(schema){
      return this.collectIDs(schema);
   }

 
  
  private collectIDs(schema){
    //   let $schema = _.cloneDeep(schema);
    //     if($schema.pages!=null) this.collectIDs(schema.pages);
    //     if(Array.isArray($schema)){
    //         $schema.forEach(element => {
    //             if(element.sections) this.collectIDs(element.sections)
    //             if(element.questions) this.collectIDs(element.questions)
    //             else {
    //                 let id = _.cloneDeep(element.id)
    //             if(typeof(id) != 'undefined'){
    //                this.IDs.push(id)
    //             }
    //         }
    //     })  }
    this.IDs = [];
        return this.IDs;
    }

}
