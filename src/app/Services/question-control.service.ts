import { Injectable } from '@angular/core';
import { PropertyModel } from '../form-editor/models/property-model';
import { PropertyFactory } from '../form-editor/models/property-factory';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators
} from '@angular/forms';
import { ALL_PROPERTIES, Properties } from '../form-editor/models/properties';
@Injectable()
export class QuestionControlService {
  propertyModels: any = [];
  properties: Properties = new Properties();
  constructor(
    private propertyFactory: PropertyFactory,
    private fb: FormBuilder
  ) {}

  toFormGroup(questions: PropertyModel<any>[]): FormGroup {
    const group: any = {};
    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });

    return this.fb.group(group);
  }

  toPropertyModelArray(schema: any) {
    this.propertyModels = [];
    const flattenedSchema: any = this.flatten(schema);
    // TODO: Replace with for...of
    for (const prop in flattenedSchema) {
      if (flattenedSchema.hasOwnProperty(prop)) {
        this.createFields(prop, flattenedSchema[prop]);
      }
    }

    return this.propertyModels;
  }

  createFields(prop: string, value?) {
    const options = {
      key: prop,
      label: '',
      value: value || null,
      required: false,
      options: [],
      order: 5,
      placeholder: '',
      rows: 5,
      searchData: '',
      type: 'text'
    };

    switch (prop) {
      case 'label':
        options.label = 'Label';
        options.required = true;
        options.placeholder = 'Enter Label';
        options.order = 1;
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;

      case 'id':
        options.label = 'ID';
        options.required = true;
        options.placeholder = 'Enter unique ID';
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;

      case 'type':
        options.label = 'Type';
        options.required = true;
        options.order = 2;
        options.options = [
          {
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
            key: 'control',
            value: 'control'
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
            key: 'encounterProvider',
            value: 'encounterProvider'
          },
          {
            key: 'encounterLocation',
            value: 'encounterLocation'
          },
          {
            key: 'personAttribute',
            value: 'personAttribute'
          }
        ];
        this.propertyModels.push(
          this.propertyFactory.createProperty('select', options)
        );
        break;

      case 'questionOptions.rendering':
        options.label = 'Rendering';
        options.required = true;
        options.order = 3;
        options.options = [
          {
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
          },
          {
            key: 'problem',
            value: 'problem'
          },
          {
            key: 'radio',
            value: 'radio'
          },
          {
            key: 'checkbox',
            value: 'checkbox'
          }
        ];

        this.propertyModels.push(
          this.propertyFactory.createProperty('select', options)
        );

        break;

      case 'isExpanded':
        options.label = 'Is Expanded';
        options.required = true;
        options.options = [
          {
            key: 'true',
            value: 'true'
          },
          {
            key: 'false',
            value: 'false'
          }
        ];

        this.propertyModels.push(
          this.propertyFactory.createProperty('select', options)
        );
        break;

      case 'questionOptions.concept':
        options.label = 'Concept';
        options.searchData = 'concept';
        this.propertyModels.push(
          this.propertyFactory.createProperty('searchbox', options)
        );
        break;

      case 'calculatedExpressions':
        options.label = 'Calculated Expressions';
        options.rows = 3;
        this.propertyModels.push(
          this.propertyFactory.createProperty('textarea', options)
        );
        break;

      case 'default':
        options.label = 'Default';
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;

      case 'original':
        options.label = 'Original';
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;

      case 'questionOptions.orderSettingUuid':
        options.label = 'Order Setting Uuid';
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;

      case 'questionOptions.orderType':
        options.label = 'Order Type';
        options.options = [
          {
            key: 'testorder',
            value: 'testorder'
          }
        ];
        this.propertyModels.push(
          this.propertyFactory.createProperty('select', options)
        );
        break;

      case 'required':
        options.label = 'Required';
        options.options = [
          {
            key: 'true',
            value: 'true'
          },
          {
            key: 'false',
            value: 'false'
          }
        ];
        this.propertyModels.push(
          this.propertyFactory.createProperty('select', options)
        );
        break;

      case 'validators':
        options.label = 'Validators';
        options.rows = 5;
        if (value) {
          options.value = JSON.stringify(value, undefined, '\t');
        }
        this.propertyModels.push(
          this.propertyFactory.createProperty('textarea', options)
        );
        break;

      case 'hide':
        options.label = 'Hide';
        options.rows = 5;
        options.value = JSON.stringify(value, undefined, '\t');
        this.propertyModels.push(
          this.propertyFactory.createProperty('textarea', options)
        );
        break;

      case 'questionOptions.answers':
        options.label = 'Answers';
        options.rows = 5;
        if (value) {
          options.value = JSON.stringify(value, undefined, '\t');
        }
        this.propertyModels.push(
          this.propertyFactory.createProperty('textarea', options)
        );
        break;

      case 'historicalExpression':
        options.label = 'Historical Expression';
        options.rows = 4;
        if (value) {
          options.value = JSON.stringify(value, undefined, '\t');
        }
        this.propertyModels.push(
          this.propertyFactory.createProperty('textarea', options)
        );
        break;

      case 'questionOptions.max':
        options.label = 'Max';
        options.type = 'number';
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;

      case 'questionOptions.min':
        options.label = 'Min';
        options.type = 'number';
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;

      case 'questionOptions.rows':
        options.label = 'Rows';
        options.type = 'number';
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;

      case 'questionOptions.showDate':
        options.label = 'Show Date';
        options.options = [
          { key: 'true', value: 'true' },
          { key: 'false', value: 'false' }
        ];
        this.propertyModels.push(
          this.propertyFactory.createProperty('select', options)
        );
        break;

      case 'questionOptions.showDateOptions':
        options.label = 'Show Date Options';
        options.rows = 5;
        if (value) {
          options.value = JSON.stringify(value, undefined, '\t');
        }
        this.propertyModels.push(
          this.propertyFactory.createProperty('textarea', options)
        );
        break;

      case 'questionOptions.showWeeks':
        options.label = 'Show Weeks List';
        options.rows = 3;
        options.placeholder = '[2,12,16,18...]';
        if (value) {
          options.value = JSON.stringify(value, undefined, '\t');
        }
        this.propertyModels.push(
          this.propertyFactory.createProperty('textarea', options)
        );
        break;

      case 'alert':
        options.label = 'Alert';
        options.rows = 5;
        if (value) {
          options.value = JSON.stringify(value, undefined, '\t');
        }
        this.propertyModels.push(
          this.propertyFactory.createProperty('textarea', options)
        );
        break;

      case 'questionOptions.selectableOrders':
        const p = this.properties.getPropertyByName('selectableOrders');
        p.value = JSON.stringify(value, undefined, '\t');
        this.propertyModels.push(p);
        break;

      case 'questionInfo':
        options.label = 'Question Info';
        this.propertyModels.push(
          this.propertyFactory.createProperty('textbox', options)
        );
        break;
    }

    return this.propertyModels.sort((a, b) => a.order - b.order);
  }

  getAllQuestionProperties() {
    return ALL_PROPERTIES;
  }

  flatten(data) {
    const result = {};

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        result[prop] = cur;
      } else {
        let isEmpty = true;
        for (const p in cur) {
          if (cur.hasOwnProperty(p)) {
            isEmpty = false;
            recurse(cur[p], prop ? prop + '.' + p : p);
          }
        }
        if (isEmpty && prop) {
          result[prop] = {};
        }
      }
    }
    recurse(data, '');
    return result;
  }

  unflatten(data) {
    'use strict';
    if (Object(data) !== data || Array.isArray(data)) {
      return data;
    }
    const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
      resultholder = {};
    for (const p in data) {
      if (data.hasOwnProperty(p)) {
        let cur = resultholder,
          prop = '',
          m;
        while ((m = regex.exec(p))) {
          cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
          prop = m[2] || m[1];
        }
        cur[prop] = data[p];
      }
    }
    return resultholder[''] || resultholder;
  }
}
