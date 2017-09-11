import {FormElement} from './FormElement'
export class Question extends FormElement{

        
        type: string;
        questionOptions={rendering:''};
       

    constructor(options:{}={}){
        super(options)
        this.type = options['type'] || '';
        this.questionOptions.rendering = options['questionOptions.rendering'] || ''
        
    }
}