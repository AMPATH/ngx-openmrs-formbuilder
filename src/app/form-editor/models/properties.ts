import { PropertyModel} from './property-model';
import { TextboxProperty } from './textbox-property';
import { SelectProperty } from './select-property';
import { TextAreaProperty } from './textarea-property';
export class Properties {

  private ID: PropertyModel < any > = new PropertyModel({
    label: 'ID',
    parentPath: 'id',
    controlType: 'textbox',
    key: 'id',
    value: '',
    order: 9,
    required: false
  });

  private Concept: PropertyModel < any > = new PropertyModel({
    label: 'Concept',
    parentPath: 'questionOptions.concept',
    controlType: 'concept',
    key: 'questionOptions.concept',
    value: '',
    order: 9,
    required: false
  });

  private Answers: PropertyModel < any > = new PropertyModel({
    label: 'Answers',
    parentPath: 'questionOptions.answers',
    controlType: '',
    key: 'questionOptions.answers',
    value: '',
    order: 9,
    required: false
  });

  private Validators: PropertyModel < any > = new PropertyModel({
    label: 'Validators',
    parentPath: 'validators',
    controlType: 'textarea',
    key: 'validators',
    value: '',
    order: 9,
    required: false
  });

  private Default: PropertyModel < any > = new PropertyModel({
    label: 'Default',
    parentPath: 'default',
    controlType: 'textbox',
    key: 'default',
    value: '',
    order: 9,
    required: false
  });

  private Original: PropertyModel < any >= new PropertyModel({
    label: 'Original',
    parentPath: 'original',
    controlType: 'textbox',
    key: 'original',
    value: '',
    order: 9,
    required: false
  });

  private Required: PropertyModel < any > = new PropertyModel({
    label: 'Required',
    parentPath: 'required',
    controlType: 'textbox',
    key: 'required',
    value: '',
    order: 9,
    required: false
  });

  private HistoricalExpression: PropertyModel < any > = new PropertyModel({
    label: 'Historical Expression',
    parentPath: 'historicalExpression',
    controlType: 'textarea',
    key: 'historicalExpression',
    value: '',
    order: 9,
    required: false
  });

  private Hide: PropertyModel < any > = new PropertyModel({
    label: 'Hide',
    parentPath: 'hide',
    controlType: 'textarea',
    key: 'hide',
    value: '',
    order: 9,
    required: false
  });

  private OrderSettingUUID: PropertyModel < any > = new PropertyModel({
    label: 'Order Setting UUID',
    parentPath: 'questionOptions.orderSettingUuid',
    controlType: 'textbox',
    key: 'questionOptions.orderSettingUuid',
    value: '',
    order: 9,
    required: false
  });

  private OrderType: TextboxProperty = new TextboxProperty({
    label: 'Order Type',
    parentPath: 'questionOptions.orderType',
    type: 'text',
    key: 'questionOptions.orderType'
  });

  private OrderSettingUuid: TextboxProperty = new TextboxProperty({
    label: 'Order Setting Uuid',
    parentPath: 'questionOptions.orderSettingUuid',
    type: 'text',
    key: 'questionOptions.orderSettingUuid'

  });


  private selectableOrders: TextAreaProperty = new TextAreaProperty({
    label: 'Selectable Orders',
    parentPath: 'questionOptions.selectableOrders',
    key: 'questionOptions.selectableOrders',
    rows: 8
  });

  private CalculatedExpressions: PropertyModel < any > = new PropertyModel({
    label: 'Calculated Expressions',
    parentPath: 'calculatedExpressions',
    controlType: 'concept',
    key: 'calculatedExpressions'
  });


  private Alert: TextAreaProperty = new TextAreaProperty({
    label: 'Alert',
    parentPath: 'alert',
    key: 'alert',
  });


  private QuestionInfo: PropertyModel < any > = new PropertyModel({
    label: 'Question Info',
    parentPath: 'questionInfo',
    controlType: 'textbox',
    key: 'questionInfo',
  });

  private Max: TextboxProperty = new TextboxProperty({
    label: 'Max',
    parentPath: 'questionOptions.max',
    type: 'number',
    key: 'questionOptions.max',
  });


  private Min: TextboxProperty  = new TextboxProperty({
    label: 'Min',
    parentPath: 'questionOptions.min',
    type: 'number',
    key: 'questionOptions.min',
  });

  private Rows: TextboxProperty  = new TextboxProperty({
    label: 'Rows',
    parentPath: 'questionOptions.rows',
    type: 'number',
    key: 'questionOptions.rows',
  });

  private showDate: SelectProperty  = new SelectProperty({
    label: 'Show Date',
    parentPath: 'questionOptions.showDate',
    options: [{key: 'true', value: 'true'}, {key: 'false', value: 'false'}],
    key: 'questionOptions.showDate',
  });

  private showDateOptions: TextAreaProperty  = new TextAreaProperty({
    label: 'Show Date Options',
    parentPath: 'questionOptions.showDateOptions',
    key: 'questionOptions.showDateOptions',
    rows: 5,
  });

  private weeksList: TextAreaProperty = new TextAreaProperty({
    label: 'Show Weeks List',
    parentPath: 'questionOptions.weeksList',
    key: 'questionOptions.weeksList',
    rows: 3,
    placeholder: '[2,12,16,18...]',
  });


  public allQuestionProperties: PropertyModel < any > [] = [
    this.ID,
    this.Concept,
    this.Validators,
    this.Default,
    this.Original,
    this.Required,
    this.HistoricalExpression,
    this.Hide,
    this.OrderType,
    this.CalculatedExpressions,
    this.Alert,
    this.QuestionInfo,
    this.Answers
  ];


  getPropertyByName(name: string) {
    const propertyName = name.toLowerCase();
    switch (propertyName) {
      case 'id':
        return this.ID;
      case 'concept':
        return this.Concept;
      case 'default':
        return this.Default;
      case 'validators':
        return this.Validators;
      case 'original':
        return this.Original;
      case 'required':
        return this.Required;
      case 'historialexpression':
        return this.HistoricalExpression;
      case 'hide':
        return this.Hide;
      case 'orderType':
        return this.OrderType;
      case 'calculatedexpressions':
        return this.CalculatedExpressions;
      case 'alert':
        return this.Alert;
      case 'questionInfo':
        return this.QuestionInfo;
      case 'answers':
        return this.Answers;
      case 'max':
        return this.Max;
      case 'min':
        return this.Min;
      case 'weekslist':
        return this.weeksList;
      case 'showdateoptions':
        return this.showDateOptions;
      case 'showdate':
        return this.showDate;
      case 'rows':
        return this.Rows;
      default:
        console.error(`${propertyName} does not exist in the property dictionary, please add it in property-model.ts`);



    }
  }

}

export const ALL_PROPERTIES = new Properties().allQuestionProperties;
