import { PropertyModel } from './property-model';
export class TextboxProperty extends PropertyModel<string>{
    
    controlType = "textbox";
    type:string;
    placeholder:string;

    constructor(options:{}={}){
        super(options);
        this.type = options['type'] || '';
        this.placeholder = options['placeholder'] || '';
    }
}