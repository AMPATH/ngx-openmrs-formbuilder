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
    {name:"rendering",path:'questionOptions.rendering',type:"any"},
    {name:"default",path:'default',type: "any"},
    {name:"original",path:'original',type:"any"},
    {name:"concept",path:'questionOptions.concept',type:"obs"},
    {name:"questions",path:'questions',type:"obsGroup"},
    //{name:"validators",path:'validators',type:"any"},
    //{name:"historical expression",path:'historical expression',type:"obs"},
    //{name:"hide",path:'hide',type:"any"},
    {name:"required",path:'required',type:"any"},
    //{name:"show Date",path:'show Date',type:"any"},
    //{name:"show Weeks",path:'show Weeks',type:"any"},
    {name:"orderSettingUuid", path:'questionOptions.orderSettingUuid', type:'testOrder'},
    {name:"orderType", path: 'questionOptions.orderType', type: 'testOrder'}
   
  ]
    
  get AllOtherPossibleProperties(){
      return this.allOtherPossibleProperties;
  }

}