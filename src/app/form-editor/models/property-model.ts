export class PropertyModel<T>{



    value:T;
    key:string;
    label:string;
    required:boolean;
    controlType:string;
    parentPath:string;
    order:number;

    constructor(options: {
      controlType?:string,
      key?: string,
      label?: string,
      value?: T,
      required?:boolean
      parentPath?:string,
      order?:number
      
    } = {}){

        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.controlType = options.controlType || '';
        this.required = options.required || false;
        this.parentPath = options.parentPath || '';
        this.order = options.order || 0;
    }


    allOtherPossibleProperties = [
    {name:"id", parentPath:"id",type:"any"},
    {name:"concept",parentPath:'questionOptions.concept',type:"obs"},
    {name:"validators",parentPath:'validators',type:"any"},
    {name:"default",parentPath:'default',type: "any"},
    {name:"original",parentPath:'original',type:"any"},
    {name:"required",parentPath:'required',type:"any"},
    {name:"historical expression",parentPath:'historicalExpression',type:"obs"},
    {name:"hide",parentPath:'hide',type:"any"},
    //{name:"show Date",path:'show Date',type:"any"},
    //{name:"show Weeks",path:'show Weeks',type:"any"},
    {name:"orderSettingUuid", parentPath:'questionOptions.orderSettingUuid', type:'testOrder'},
    {name:"orderType", parentPath: 'questionOptions.orderSettingUuid', type: 'testOrder'}
   
  ]
    
  get AllOtherPossibleProperties(){
      return this.allOtherPossibleProperties;
  }

}