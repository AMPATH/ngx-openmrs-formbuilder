export class Form{

    name:string;
    uuid:string;
    processor:string;
    referencedForms:any;
    pages:any;

    constructor(options:{}={}){
        this.name = options['name']
        this.pages = options['pages']
        this.processor = options['processor']
        this.uuid = options['uuid']
        this.referencedForms = options['referencedForms']
    }
}