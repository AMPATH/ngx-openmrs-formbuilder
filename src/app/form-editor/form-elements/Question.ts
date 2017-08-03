import {FormElement} from './FormElement'
export class Question extends FormElement{

  
        type: string;
        id: string;
   

    constructor(options:{}={}){
        super(options)
        this.type = options['type'] || '';
        this.id = options['id'] || '';
        
        
    }
}