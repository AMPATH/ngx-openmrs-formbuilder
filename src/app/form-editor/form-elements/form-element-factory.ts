import { Injectable } from '@angular/core'
import { FormElement } from './FormElement'
import { Page } from './Page'
import { Section } from './Section'
import { Question } from './Question'

@Injectable()
export class FormElementFactory {

  constructor() {}

  createFormElement(type:string,options:any):FormElement{
    if(type.toLowerCase() === "page"){
        return new Page(options);
    }

    if(type.toLowerCase() === "section"){
        return new Section(options);
    }

    if(type.toLowerCase() === "question"){
        return new Question(options)
    }

    else{
      console.log(type+" Element not supported")
    }


  }
}
