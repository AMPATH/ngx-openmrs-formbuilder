import {FormElement} from './FormElement';
interface QuestionOptions{
    rendering:string;
    
}
export class Question extends FormElement{

        id:string='';
        type: string;
        questionOptions:QuestionOptions=
        {rendering:''
        };
       

    constructor(options:{}={}){
        super(options)
        this.type = options['type'] || '';
        this.questionOptions.rendering = options['questionOptions.rendering'] || ''
        
    }
}