import {FormElement} from './FormElement'
export class Question extends FormElement{

  
        type: string;
        id: string;
   

    constructor(options:{}={}){
        super(options)
        this.id = options['id'] || '';
        this.type = options['type'] || '';
        
    }
}