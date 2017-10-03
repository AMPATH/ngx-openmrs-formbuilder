import {PropertyModel} from './property-model';

export class Properties {

  private ID: PropertyModel < any > = new PropertyModel({
    label: "ID",
    parentPath: "id",
    controlType: "textbox",
    key: "id",
    value: "",
    order: 9,
    required: false
  });

  private Concept: PropertyModel < any > = new PropertyModel({
    label: "Concept",
    parentPath: 'questionOptions.concept',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private Validators: PropertyModel < any > = new PropertyModel({
    label: "Validators",
    parentPath: 'validators',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private Default: PropertyModel < any > = new PropertyModel({
    label: "Default",
    parentPath: 'default',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private Original: PropertyModel < any >= new PropertyModel({
    label: "Original",
    parentPath: 'original',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private Required: PropertyModel < any > = new PropertyModel({
    label: "Required",
    parentPath: 'required',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private HistoricalExpression: PropertyModel < any > = new PropertyModel({
    label: "Historical Expression",
    parentPath: 'historicalExpression',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private Hide: PropertyModel < any > = new PropertyModel({
    label: "Hide",
    parentPath: 'hide',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private OrderSettingUUID: PropertyModel < any > = new PropertyModel({
    label: "Order Setting UUID",
    parentPath: 'questionOptions.orderSettingUuid',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private OrderRequired: PropertyModel < any > = new PropertyModel({
    label: "Order required",
    parentPath: 'questionOptions.orderSettingUuid',
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });

  private CalculatedExpressions: PropertyModel < any > = new PropertyModel({
    label: "Calculated Expressions",
    parentPath: "calculatedExpressions",
    controlType: "concept",
    key: "questionOptions.concept",
    value: "",
    order: 9,
    required: false
  });


  private Alert: PropertyModel < any > = new PropertyModel({
    label: "Alert",
    parentPath: 'alert',
    controlType: "textarea",
    key: "alert",
    value: "",
    order: 9,
    required: false
  });


  private QuestionInfo: PropertyModel < any > = new PropertyModel({
    label: "Question Info",
    parentPath: 'questionInfo',
    controlType: "text",
    key: "questionInfo",
    value: "",
    order: 9,
    required: false
  });

  public allPossibleProperties: PropertyModel < any > [] = [
    this.ID,
    this.Concept,
    this.Validators,
    this.Default,
    this.Original,
    this.Required,
    this.HistoricalExpression,
    this.Hide,
    this.OrderRequired,
    this.CalculatedExpressions,
    this.Alert,
    this.QuestionInfo
  ]
 

}

export const ALL_PROPERTIES = new Properties().allPossibleProperties;