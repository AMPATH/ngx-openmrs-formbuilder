export class PropertyModel<T>{


    //mandatory properties
    value:T;
    key:string;
    label:string;
    required:boolean;
    controlType:string;


    constructor(options: {
      controlType?:string,
      key?: string,
      label?: string,
      value?: T,
      required?:boolean
      
    } = {}){

        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.controlType = options.controlType || '';
        this.required = options.required || false;
    }


    allOtherPossibleProperties = [

    {name:"Rendering",path:'questionOptions.rendering',type:"any"},
    {name:"DefaultValue",path:'',type: "any"},
    {name:"OriginalValue",path:'',type:"any"},
    {name:"Concept",path:'questionOptions.concept',type:"obs"},
    {name:"Questions",path:'',type:"obsGroup"},
    {name:"Answers",path:'',type:"obs"},
    {name:"Validators",path:'',type:"any"},
    {name:"Historical Expression",path:'',type:"obs"},
    {name:"Required",path:'',type:"any"},
    {name:"Show Date",path:'',type:"any"},
    {name:"Show Weeks",path:'',type:"any"},
    {name:"Hide",path:'',type:"any"}
   
  ]
    
  get AllOtherPossibleProperties(){
      return this.allOtherPossibleProperties;
  }

}