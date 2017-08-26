import { Injectable } from '@angular/core';
import {Form} from './Form'
@Injectable()
export class FormFactory {

  constructor() {
    
   }

  createForm(options){
    return new Form(options);
  }

}
