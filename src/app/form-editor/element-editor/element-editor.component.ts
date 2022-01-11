import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyModel } from '.././models/property-model';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { QuestionControlService } from '../../Services/question-control.service';
import { NavigatorService } from '../../Services/navigator.service';
import { QuestionIdService } from '../../Services/question-id.service';
import { FormElementFactory } from '.././form-elements/form-element-factory';
import { AlertComponent } from '../../modals/alert.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ElementEditorService } from '../../Services/element-editor.service';
import { Question } from '../form-elements/Question';
import { SchemaModalComponent } from '../../modals/schema-editor.modal';
import { ALL_PROPERTIES, Properties } from '../models/properties';
import * as _ from 'lodash';
import { PropertyFactory } from '../models/property-factory';
import { TextboxProperty } from '../models/textbox-property';
import { ConceptService } from '../../Services/openmrs-api/concept.service';

@Component({
  selector: 'app-element-editor',
  templateUrl: './element-editor.component.html',
  styleUrls: ['./element-editor.component.css']
})
export class ElementEditorComponent implements OnInit {
  _rawSchema: any;
  _schema: any;
  _questionSchema: any;
  questions: PropertyModel<any>[];
  questionProperties: Properties = new Properties();
  form: FormGroup;
  setMembers: any[] = [];
  @Input() pageIndex: number;
  @Input() sectionIndex: number;
  @Input() questionIndex: number; // if editMode or addMode obsGroup Question
  @Input() parentQuestionIndex: number;
  @Input() set rawSchema(rawSchema) {
    this._rawSchema = _.cloneDeep(rawSchema);
  } // if edit obsGroup question
  @Output() closeComponent: EventEmitter<boolean> = new EventEmitter();

  pageStr: string;
  sectionStr: string;
  questionStr: string;
  allPossibleproperties: Array<any>;
  addMode = false;
  editMode = false;
  id: number; // ID to the current edited question
  answers: Object;

  constructor(
    private qcs: QuestionControlService,
    private formElementFactory: FormElementFactory,
    private qis: QuestionIdService,
    private ns: NavigatorService,
    private dialogService: DialogService,
    private el: ElementEditorService,
    private propertyFactory: PropertyFactory,
    private conceptService: ConceptService
  ) {}

  @Input() set schema(schema) {
    this._schema = _.clone(schema);
  }

  @Input() set _questions(questions) {
    this.questions = questions;
    this.form = this.qcs.toFormGroup(this.questions);
    this.setMode(this.form);
    this.breadcrumbsSetup();
  }

  @Input() set questionSchema(schema: any) {
    this._questionSchema = schema;
    if (this._questionSchema) {
      if (this._questionSchema.questions) {
        this.setMembers = this._questionSchema.questions;
      }
    }
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.setMode(this.form);
    this.allPossibleproperties = ALL_PROPERTIES;
    this.breadcrumbsSetup();
    this.el.getMappings().subscribe((mappings) => {
      this.setMappings(mappings);
    });
    this.el.getSetMembers().subscribe((setMembers) => {
      this.setSetMembers(setMembers);
    });

    this.el.getConceptId().subscribe((id) => {
      this.setConceptId(id);
    });
  }

  public setConceptId(id) {
    const prop = this.getProperty('conceptID');
    if (!this.form.contains(prop.key)) {
      prop.value = id;
      this.addProperty(prop);
    } else {
      this.form.controls[prop.key].setValue(id);
    }
  }
  addProperty(prop: PropertyModel<any>) {
    if (this.form.contains(prop.key)) {
      this.showAlert('Property already added!');
      return;
    }
    if (!prop.value) {
      this.form.addControl(prop.key, new FormControl(''));
    } else {
      this.form.addControl(prop.key, new FormControl(prop.value));
    }
    this.questions.push(prop);
  }

  onSubmit() {
    const id = this.getProperty('id');
    if (this.form.contains(id.key)) {
      if (!this.checkId(this.form.get(id.key).value)) {
        return;
      }
    }
    const question = this.qcs.unflatten(this.form.value);
    if (question['type'] === 'obsGroup') {
      question['questions'] = this.setMembers;
    }

    if (question['validators']) {
      question['validators'] = this.parse(
        this.form.controls['validators'].value
      );
    }

    if (question['alert']) {
      question['alert'] = this.parse(this.form.controls['alert'].value);
    }

    if (question['hide']) {
      question['hide'] = this.parse(this.form.controls['hide'].value);
    }

    if (question.questionOptions['answers']) {
      question.questionOptions['answers'] = this.parse(
        this.form.controls['questionOptions.answers'].value
      );
    }

    if (question.questionOptions['selectableOrders']) {
      question.questionOptions['selectableOrders'] = this.parse(
        this.form.controls['questionOptions.selectableOrders'].value
      );
    }

    if (question.questionOptions['conceptMappings']) {
      question.questionOptions['conceptMappings'] = this.parse(
        this.form.controls['questionOptions.conceptMappings'].value
      );
    }

    if (this.addMode) {
      this.addQuestion(
        question,
        this.pageIndex,
        this.sectionIndex,
        this.questionIndex
      );
    }
    if (this.editMode) {
      this.editQuestion(
        question,
        this.pageIndex,
        this.sectionIndex,
        this.questionIndex,
        this.parentQuestionIndex
      );
    }
  }

  breadcrumbsSetup() {
    this.pageStr = this._schema.pages[this.pageIndex].label;
    this.sectionStr = this._schema.pages[this.pageIndex].sections[
      this.sectionIndex
    ].label;
    this.questionStr = '';
    if (this.editMode && this.questionIndex !== -1) {
      this.questionStr = this._schema.pages[this.pageIndex].sections[
        this.sectionIndex
      ].questions[this.questionIndex].label;
    }
  }

  parse(str) {
    return JSON.parse(str);
  }

  //   parseTextAreaQuestions(form: FormGroup, formValue: any) {
  //     const question = this.qcs.unflatten(formValue);
  //     for (const prop in formValue){
  //         const propModel = this.getProperty(prop);
  //         if (propModel) {
  //           if (propModel.controlType === 'textarea') {
  //             question[propModel.key] = this.parse(form.controls[propModel.key].value);
  //           }
  //         }
  //   }
  //   return question;
  // }

  deleteProp(index: number) {
    this.form.removeControl(this.questions[index].key);
    this.questions.splice(index, 1);
  }

  setMode(form: FormGroup) {
    this.form.get('label').value === ''
      ? this.setAddMode()
      : this.setEditMode();
  }

  setAddMode() {
    this.editMode = false;
    this.addMode = true;
  }

  setEditMode() {
    this.editMode = true;
    this.addMode = false;
    this.id = this.form.get('id').value;
  }

  setSetMembers(setMembers) {
    this.setMembers = [];
    setMembers.forEach((setMember) => {
      let rendering = 'text';
      if (setMember.answers.length > 0) {
        rendering = 'select';
      }
      const question: Question = new Question();
      question.label = setMember.label;
      question.type = 'obs';
      (question.id = ''), (question.questionOptions.rendering = rendering);

      question.questionOptions['concept'] = setMember.concept;
      if (!_.isEmpty(setMember.answers)) {
        question.questionOptions['answers'] = setMember.answers;
      }
      this.form.controls['type'].setValue('obsGroup');
      this.form.controls['questionOptions.rendering'].setValue('group');
      this.setMembers.push(question);
    });
  }

  checkId(id): boolean {
    if (this.form.contains('id')) {
      const _id = this.form.get('id').value;
      const ids = this.qis.getIDs(this._rawSchema);
      let count = 0;
      for (const $id of ids) {
        if ($id === _id) {
          count++;
        }
      }
      if (this.editMode && this.id !== _id && count > 0) {
        this.showAlert('ID exists \n Try using a different ID');
        return false;
      } else if (this.addMode && count > 0) {
        this.showAlert('ID exists \n Try using a different ID');
        return false;
      } else {
        return true;
      }
    }
  }

  showAlert(message: string) {
    this.dialogService.addDialog(AlertComponent, {
      message: message
    });
  }

  setPropValue(propKey, value) {
    this.form.controls[propKey].setValue(value);
  }

  setAnswers(answers) {
    const answersProp = this.getProperty('answers');
    this.answers = answers; // selectedAnswers
    if (answers.length > 0) {
      if (this.form.contains(answersProp.key)) {
        this.setPropValue(
          answersProp.key,
          JSON.stringify(answers, undefined, '\t')
        );
      } else {
        answersProp.value = JSON.stringify(answers, undefined, '\t');
        this.addProperty(answersProp);
      }
    } else {
      if (this.form.controls[answersProp.key]) {
        this.removeQuestion('questionOptions.answers');
      } else {
        return;
      }
    }
  }

  setMappings(mappings) {
    const mappingsProp = this.getProperty('conceptMappings');
    const props = this.conceptService.createMappingsValue(mappings);
    if (!this.form.controls[mappingsProp.key]) {
      mappingsProp.value = JSON.stringify(props, null, '\t');
      this.addProperty(mappingsProp);
    } else {
      this.form.controls[mappingsProp.key].setValue(
        JSON.stringify(props, null, '\t')
      );
    }
  }

  addQuestion(
    question: any,
    pageIndex: number,
    sectionIndex: number,
    questionIndex?: number
  ) {
    if (questionIndex !== undefined) {
      // obsGroup question
      if (this._rawSchema.pages[pageIndex].label) {
        if (this._rawSchema.pages[pageIndex].sections[sectionIndex].label) {
          this._schema.pages[pageIndex].sections[sectionIndex].questions[
            questionIndex
          ].questions.push(question);
          this._rawSchema.pages[pageIndex].sections[sectionIndex].questions[
            questionIndex
          ].questions.push(question);
        } else {
          this.showAlert('You cannot add a question to a referenced section.');
          return;
        }
      } else {
        this.showAlert('You cannot add a question to a referenced page.');
        return;
      }
    } else {
      if (this._rawSchema.pages[pageIndex].label) {
        if (this._rawSchema.pages[pageIndex].sections[sectionIndex].label) {
          this._rawSchema.pages[pageIndex].sections[
            sectionIndex
          ].questions.push(question);
          this._schema.pages[pageIndex].sections[sectionIndex].questions.push(
            question
          );
        } else {
          this.showAlert('You cannot add a question to a referenced section.');
          return;
        }
      } else {
        this.showAlert('You cannot add a question to a referenced page.');
        return;
      }
    }
    this.ns.setSchema(this._schema);
    this.ns.setRawSchema(this._rawSchema);
    this.form.reset();
    this.closeElementEditor();
  }

  editQuestion(
    question,
    pageIndex,
    sectionIndex,
    questionIndex,
    parentQuestionIndex?
  ) {
    if (parentQuestionIndex !== undefined) {
      if (this._rawSchema.pages[pageIndex].label) {
        if (this._rawSchema.pages[pageIndex].sections[sectionIndex].label) {
          this._schema.pages[pageIndex].sections[sectionIndex].questions[
            parentQuestionIndex
          ].questions.splice(questionIndex, 1, question);
          this._rawSchema.pages[pageIndex].sections[sectionIndex].questions[
            parentQuestionIndex
          ].questions.splice(questionIndex, 1, question);
        } else {
          this.showAlert('You cannot edit a question of a referenced section');
          return;
        }
      } else {
        this.showAlert('You cannot edit a question of a referenced page');
        return;
      }
    } else {
      if (this._rawSchema.pages[pageIndex].label) {
        if (this._rawSchema.pages[pageIndex].sections[sectionIndex].label) {
          this._schema.pages[pageIndex].sections[sectionIndex].questions.splice(
            questionIndex,
            1,
            question
          );
          this._rawSchema.pages[pageIndex].sections[
            sectionIndex
          ].questions.splice(questionIndex, 1, question);
        } else {
          this.showAlert('You cannot edit a question of a referenced section.');
          return;
        }
      } else {
        this.showAlert('You cannot edit a question of a referenced page.');
        return;
      }
    }
    this.ns.setSchema(this._schema);
    this.ns.setRawSchema(this._rawSchema);
  }

  checkQuestion(question) {
    if (
      question.key === 'label' ||
      question.key === 'type' ||
      question.key === 'questionOptions.rendering'
    ) {
      return false;
    }
    return true;
  }

  typeSelected(type: string) {
    const conceptProperty = this.getProperty('concept');
    const orderTypeProperty = this.getProperty('ordertype');
    const orderSettingUuid = this.getProperty('ordersettinguuid');
    if (type === 'obs') {
      if (!this.form.contains(conceptProperty.key)) {
        this.addProperty(conceptProperty);
      }
    } else if (type === 'testOrder') {
      if (!this.form.contains(orderTypeProperty.key)) {
        this.addProperty(orderTypeProperty);
      }
      if (!this.form.contains(orderSettingUuid.key)) {
        this.addProperty(orderSettingUuid);
      }
    }
  }

  getProperty(propertyName: string): PropertyModel<any> {
    return this.questionProperties.getPropertyByName(propertyName);
  }

  renderingSelected(rendering: string) {
    const maxProperty = this.getProperty('max');
    const minProperty = this.getProperty('min');
    const showDateProperty = this.getProperty('showdate');
    const rowsProperty = this.getProperty('rows');
    const showWeeksProperty = this.getProperty('weekslist');

    switch (rendering) {
      case 'number':
        this.removePreviousFields(rendering);
        if (
          !this.form.contains(maxProperty.key) &&
          !this.form.contains(minProperty.key)
        ) {
          this.addProperty(maxProperty);
          this.addProperty(minProperty);
          this.addProperty(showDateProperty);
        }
        break;

      case 'textarea':
        this.removePreviousFields(rendering);
        if (!this.form.contains(rowsProperty.key)) {
          this.addProperty(rowsProperty);
        }
        break;

      case 'date':
        this.removePreviousFields(rendering);
        if (!this.form.contains(showWeeksProperty.key)) {
          this.addProperty(showWeeksProperty);
        }
        break;
      default:
        this.removePreviousFields(rendering);
    }
  }

  reselectAnswers() {
    if (this.answers !== undefined) {
      this.el.reShowAnswersDialog(this.answers);
    } else {
      this.el.reShowAnswersDialog(
        JSON.parse(this.form.controls['questionOptions.answers'].value)
      );
    }
  }

  closeElementEditor() {
    this.closeComponent.emit(true);
  }

  viewSetMembers() {
    this.dialogService.addDialog(SchemaModalComponent, {
      schema: JSON.stringify(this.setMembers, null, 4),
      title: 'Set Members Schema'
    });
  }

  reselectSetMembers() {
    this.el.reShowSetMembersDialog(this.setMembers);
  }

  removePreviousFields(rendering: string) {
    switch (rendering) {
      case 'number':
        this.removeDateRelatedFields();
        this.removeTextAreaRelatedFields();
        break;

      case 'textarea':
        this.removeNumberRelatedFields();
        this.removeDateRelatedFields();
        break;

      case 'date':
        this.removeNumberRelatedFields();
        this.removeTextAreaRelatedFields();
        break;

      default:
        this.removeDateRelatedFields();
        this.removeNumberRelatedFields();
        this.removeTextAreaRelatedFields();
        break;
    }
  }

  removeQuestion(qn) {
    let i;
    this.questions.forEach((question, index) => {
      if (question['key'] === qn) {
        i = index;
      }
    });
    this.deleteProp(i);
  }

  showDate($event) {
    const showDateOptionsProperty = this.getProperty('showdateoptions');
    if ($event === true) {
      if (!this.form.contains(showDateOptionsProperty.key)) {
        this.addProperty(showDateOptionsProperty);
      }
    } else {
      this.form.removeControl(showDateOptionsProperty.key);
      this.removeQuestion(showDateOptionsProperty.key);
    }
  }

  removeTextAreaRelatedFields() {
    if (this.form.contains('questionOptions.rows')) {
      this.form.removeControl('questionOptions.rows');
      this.removeQuestion('questionOptions.rows');
    }
  }

  removeNumberRelatedFields() {
    if (this.form.contains('questionOptions.max')) {
      this.removeQuestion('questionOptions.max');
      this.form.removeControl('questionOptions.max');
    }
    if (this.form.contains('questionOptions.min')) {
      this.form.removeControl('questionOptions.min');
      this.removeQuestion('questionOptions.min');
    }

    if (this.form.contains('questionOptions.showDate')) {
      this.form.removeControl('questionOptions.showDate');
      this.removeQuestion('questionOptions.showDate');
    }
  }

  removeDateRelatedFields() {
    if (this.form.contains('questionOptions.weeksList')) {
      this.form.removeControl('questionOptions.weeksList');
      this.removeQuestion('questionOptions.weeksList');
    }
  }
}
