import { PropertyModel} from './property-model';
import { TextboxProperty } from './textbox-property';
import { SelectProperty } from './select-property';
import { TextAreaProperty } from './textarea-property';
import { SearchboxProperty } from './searchbox-property';
export class Properties {

  private ID: PropertyModel < any > = new PropertyModel({
    label: 'ID',
    parentPath: 'id',
    controlType: 'textbox',
  });

  private Concept: SearchboxProperty  = new SearchboxProperty({
    label: 'Concept',
    parentPath: 'questionOptions.concept',
    key: 'questionOptions.concept',
    searchData: 'concept'
  });

  private ConceptId: TextboxProperty = new TextboxProperty({
    label: 'Concept ID',
    parentPath: 'questionOptions.conceptId',
    key: 'questionOptions.conceptId'
  });
  private Answers: TextAreaProperty = new TextAreaProperty({
    label: 'Answers',
    parentPath: 'questionOptions.answers',
    rows: 5,
    key: 'questionOptions.answers',
  });

  private Validators: PropertyModel < any > = new PropertyModel({
    label: 'Validators',
    parentPath: 'validators',
    controlType: 'textarea',
    key: 'validators',
  });

  private Default: PropertyModel < any > = new PropertyModel({
    label: 'Default',
    parentPath: 'default',
    controlType: 'textbox',
    key: 'default',

  });

  private Original: PropertyModel < any >= new PropertyModel({
    label: 'Original',
    parentPath: 'original',
    controlType: 'textbox',
    key: 'original'
  });

  private Required: PropertyModel < any > = new PropertyModel({
    label: 'Required',
    parentPath: 'required',
    controlType: 'textbox',
    key: 'required'
  });

  private HistoricalExpression: PropertyModel < any > = new PropertyModel({
    label: 'Historical Expression',
    parentPath: 'historicalExpression',
    controlType: 'textarea',
    key: 'historicalExpression'
  });

  private Hide: PropertyModel < any > = new PropertyModel({
    label: 'Hide',
    parentPath: 'hide',
    controlType: 'textarea',
    key: 'hide',
  });

  private OrderType: SelectProperty = new SelectProperty({
    label: 'Order Type',
    parentPath: 'questionOptions.orderType',
    options: [{key: 'drugorder', value: 'Drug Order'}, {key: 'testorder', value: 'Test Order'}],
    key: 'questionOptions.orderType'
  });

  private OrderSettingUuid: TextboxProperty = new TextboxProperty({
    label: 'Order Setting Uuid',
    parentPath: 'questionOptions.orderSettingUuid',
    key: 'questionOptions.orderSettingUuid'
  });


  private selectableOrders: TextAreaProperty = new TextAreaProperty({
    label: 'Selectable Orders',
    parentPath: 'questionOptions.selectableOrders',
    key: 'questionOptions.selectableOrders',
    rows: 8
  });

  private CalculatedExpressions: TextAreaProperty = new TextAreaProperty({
    label: 'Calculated Expressions',
    parentPath: 'calculatedExpressions',
    rows: 5,
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

  private conceptMappings: TextAreaProperty = new TextAreaProperty({
    label: 'Concept Mappings',
    parentPath: 'questionOptions.conceptMappings',
    key: 'questionOptions.conceptMappings',
    rows: 5,
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
    this.CalculatedExpressions,
    this.Alert,
    this.QuestionInfo,
    this.Answers,
    this.OrderType,
    this.OrderSettingUuid,
    this.selectableOrders,
    this.conceptMappings,
    this.ConceptId
  ];


  getPropertyByName(name: string) {
    const propertyName = name.toLowerCase();
    switch (propertyName) {
      case 'id':
        return this.ID;
      case 'concept':
        return this.Concept;
      case 'conceptid':
        return this.ConceptId;
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
      case 'ordertype':
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
      case 'ordersettinguuid':
        return this.OrderSettingUuid;
      case 'selectableorders':
        return this.selectableOrders;
      case 'conceptmappings':
        return this.conceptMappings;
      default:
        console.error(`${propertyName} does not exist in the property dictionary, please add it in property-model.ts`);



    }
  }

}

export const ALL_PROPERTIES = new Properties().allQuestionProperties;
