import {FormElement} from './FormElement'
export class Section extends FormElement{

  
        questions: Array<{}>;
        isExpanded: boolean;
   

    constructor(options:{}={}){
        super(options)
        this.isExpanded = options['isExpanded'] || false;
        this.questions = options['questions'] || [];
    }
}