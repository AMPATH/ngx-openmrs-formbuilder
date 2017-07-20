export class Page{
    
    constructor(label:string){
        this.label = label;
        this.sections = [];
    }
    label: string;
    sections: Array<{}>;
}