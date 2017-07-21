export class Section{
    constructor(label:string, isExpanded:boolean){
        this.label = label;
        this.isExpanded = isExpanded;
    }
    label:string;
    isExpanded:boolean;
}