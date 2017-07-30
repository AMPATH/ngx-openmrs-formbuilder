import { Injectable } from '@angular/core';
import { PropertyModel } from '../form-editor/models/property-model'
import { PropertyFactory } from '../form-editor/models/property-factory';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
@Injectable()
export class QuestionControlService {

  propertyModels:PropertyModel<any>[]=[];
  constructor(private propertyFactory:PropertyFactory, private fb:FormBuilder) { }

  toFormGroup(questions: PropertyModel<any>[]):FormGroup{
    let group:any = {};
    questions.forEach(
      question => {
        group[question.key] = question.required? new FormControl( question.value ||'',Validators.required) : 
        new FormControl(question.value);
      }
    
    )
    return this.fb.group(group); 
  }

  
  toPropertyModelArray(schema:any){
    
    this.propertyModels = [];
    let flattenedSchema:any = this.flatten(schema);
    for(var prop in flattenedSchema){
       this.createFields(prop)
      }
      return this.propertyModels;
  }


  createFields(prop){
      let options={
        key: prop,
        label: "",
        value:"",
        required:false,
        options:[],
        placeholder:""
      }


     switch(prop){

          case "label":
            options.label = "Label"
            options.required = true;
            options.placeholder = "Enter question label"
            this.propertyModels.push(this.propertyFactory.createProperty('textbox',options));

            break;

          case "id":
            options.label = "ID"
            options.required = true
            options.placeholder = "Enter unique ID"
            this.propertyModels.push(this.propertyFactory.createProperty('textbox',options));

            break;


          case "type":
            options.label= "Type"
            options.required= true
            options.options = [
                                {key: 'obs',  value: 'obs'},
                                {key: 'obsGroup',  value: 'obsGroup'},
                                {key: 'testOrder',   value: 'testOrder'},
                                {key: 'complex-obs', value: 'complex-obs'},
                                {key: 'encounterDatetime', value: 'encounterDatetime'},
                                {key: "encounterProvider", value: "encounterProvider"},
                                {key: "encounterLocation", value: "encounterLocation"},
                             ]
             this.propertyModels.push(this.propertyFactory.createProperty('select',options));
             break;

          case "questionOptions.rendering":
            options.label = "Rendering"
            options.required = true
            options.options = [
                                {key: 'number', value:'Number'},
                                {key: 'ui-select-extended', value:'UI-select-extended'}
                              ]
            
            this.propertyModels.push(this.propertyFactory.createProperty('select',options));

            break;
        }

  }
 
 

  getAllPossibleProperties(){
    return new PropertyModel().AllOtherPossibleProperties;
  }
 
 
 


  flatten(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}


}
