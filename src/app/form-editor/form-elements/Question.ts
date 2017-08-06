import {FormElement} from './FormElement'
export class Question extends FormElement{

        questionOptions={rendering:''};
        type: string;
        id: string;
       

    constructor(options:{}={}){
        super(options)
        this.type = options['type'] || '';
        this.id = options['id'] || '';
        this.questionOptions.rendering = options['questionOptions.rendering'] || ''
        
    }
}