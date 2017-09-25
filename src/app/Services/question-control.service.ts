import { Injectable } from '@angular/core';
import { PropertyModel } from '../form-editor/models/property-model'
import { PropertyFactory } from '../form-editor/models/property-factory';
import {FormGroup, FormControl, FormBuilder, FormArray, Validators} from '@angular/forms'
@Injectable()
export class QuestionControlService {

  propertyModels: any = [];
  constructor(private propertyFactory: PropertyFactory, private fb: FormBuilder) {}

  toFormGroup(questions: PropertyModel < any > []): FormGroup {
    let group: any = {};
    let ArrPropModelArray: any;
    questions.forEach(
      question => {

        group[question.key] = question.required? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '')
      }

    )

    return this.fb.group(group);
  }


  toPropertyModelArray(schema: any) {
    this.propertyModels = [];
    let flattenedSchema: any = this.flatten(schema);
    console.log(flattenedSchema)
    for (var prop in flattenedSchema) {

      this.createFields(prop, flattenedSchema[prop])
    }

    return this.propertyModels;
  }




  createFields(prop: string, value ? ) {

    
    let options = {
      key: prop,
      label: "",
      value: value || "",
      required: false,
      options: [],
      order: 5,
      placeholder: "",
      rows: 5,
    }


    switch (prop) {
      
      case "label":
        options.label = "Label";
        options.required = true;
        options.placeholder = "Enter Label";
        options.order = 1;
        this.propertyModels.push(this.propertyFactory.createProperty('textbox', options));
        break;

      // case "id":
      //   options.label = "ID"
      //   options.required = true
      //   options.placeholder = "Enter unique ID"
      //   this.propertyModels.push(this.propertyFactory.createProperty('textbox', options));
      //   break;


      case "type":
        options.label = "Type";
        options.required = true;
        options.order = 2;
        options.options = [{
            key: 'obs',
            value: 'obs'
          },
          {
            key: 'obsGroup',
            value: 'obsGroup'
          },
          {
            key: 'testOrder',
            value: 'testOrder'
          },
          {
            key: 'complex-obs',
            value: 'complex-obs'
          },
          {
            key: 'encounterDatetime',
            value: 'encounterDatetime'
          },
          {
            key: "encounterProvider",
            value: "encounterProvider"
          },
          {
            key: "encounterLocation",
            value: "encounterLocation"
          },
          {
            key: "personAttribute",
            value: "personAttribute"
          }
        ]
        this.propertyModels.push(this.propertyFactory.createProperty('select', options));
        break;

      case "questionOptions.rendering":
        options.label = "Rendering";
        options.required = true;
        options.order = 3;
        options.options = [{
            key: 'number',
            value: 'number'
          },
          {
            key: 'text',
            value: 'text'
          },
          {
            key: 'textarea',
            value: 'textarea'
          },
          {
            key: 'date',
            value: 'date'
          },
          {
            key: 'drug',
            value: 'drug'
          },
          {
            key: 'group',
            value: 'group'
          },
          {
            key: 'select',
            value: 'select'
          },
          {
            key: 'repeating',
            value: 'repeating'
          },
          {
            key: 'multicheckbox',
            value: 'multiCheckbox'
          },
          {
            key: 'ui-select-extended',
            value: 'ui-select-extended'
          },
          {
            key: 'select-concept-answers',
            value: 'select-concept-answers'
          },
          {
            key: 'file',
            value: 'file'
          }
        ]

        this.propertyModels.push(this.propertyFactory.createProperty('select', options));

        break;

      case "isExpanded":
        options.label = "Is Expanded"
        options.required = true
        options.options = [{
            key: "true",
            value: "true"
          },
          {
            key: "false",
            value: "false"
          }
        ]

        this.propertyModels.push(this.propertyFactory.createProperty('select', options));
        break;


      case "questionOptions.concept":
        options.label = "Concept";
        this.propertyModels.push(this.propertyFactory.createProperty('searchbox', options));
        break;

      case "calculatedExpressions":
        options.label = "Calculated Expressions";
        options.rows = 3;
        this.propertyModels.push(this.propertyFactory.createProperty('textarea', options));
        break;
        
      case "default":
        options.label = "Default"
        this.propertyModels.push(this.propertyFactory.createProperty('textbox', options));
        break;

      case "original":
        options.label = "Original"
        this.propertyModels.push(this.propertyFactory.createProperty('textbox', options));
        break;

      case "questionOptions.orderSettingUuid":
        options.label = "Order Setting Uuid"
        this.propertyModels.push(this.propertyFactory.createProperty('searchbox', options));
        break;

      case "questionOptions.orderType":
        options.label = "Order Type"
        options.options = [{
          key: 'testorder',
          value: 'testorder'
        }]
        this.propertyModels.push(this.propertyFactory.createProperty('select', options));
        break;

      case "required":
        options.label = "Required"
        options.options = [{
          key: 'true',
          value: 'true'
        }, {
          key: 'false',
          value: 'false'
        }]
        this.propertyModels.push(this.propertyFactory.createProperty('select', options));
        break;

      case "validators":
        options.label = "Validators"
        options.rows = 5
        options.value = JSON.stringify(value, undefined, "\t");
        this.propertyModels.push(this.propertyFactory.createProperty('textarea', options))
        break;


      case "hide":
        options.label = "Hide"
        options.rows = 5
        options.value = JSON.stringify(value, undefined, "\t");
        this.propertyModels.push(this.propertyFactory.createProperty('textarea', options))
        break;

      case "questionOptions.answers":
        options.label = "Answers"
        options.rows = 5
        options.value = JSON.stringify(value, undefined, "\t");
        console.log(options.value)
        this.propertyModels.push(this.propertyFactory.createProperty('textarea', options))
        break;

      case "historicalExpression":
        options.label = "Historical Expression"
        options.rows = 4
        this.propertyModels.push(this.propertyFactory.createProperty('textarea', options))
        break;

    }

    return this.propertyModels.sort((a, b) => a.order - b.order);

  }


  getAllPossibleProperties() {
    return new PropertyModel().AllOtherPossibleProperties;
  }





  flatten(data) {
    var result = {};

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        result[prop] = cur;
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop)
          result[prop] = {};
      }
    }
    recurse(data, "");
    return result;

  }



  unflatten(data) {
    "use strict";
    if (Object(data) !== data || Array.isArray(data))
      return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
      resultholder = {};
    for (var p in data) {
      var cur = resultholder,
        prop = "",
        m;
      while (m = regex.exec(p)) {
        cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
        prop = m[2] || m[1];
      }
      cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
  };



}
