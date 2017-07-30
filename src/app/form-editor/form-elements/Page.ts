import {FormElement} from './FormElement'
export class Page extends FormElement{

    sections:Array<{}> = [];

    constructor(options:{}={}){
            super(options);
            this.sections = options['sections'] || '';
    }
}