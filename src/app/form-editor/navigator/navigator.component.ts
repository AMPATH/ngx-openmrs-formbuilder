import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { ConfirmComponent } from '../../modals/confirm.component';
import { PromptComponent } from '../../modals/prompt.component';
import { AlertComponent } from '../../modals/alert.component';
import { ReferenceModalComponent } from '../../modals/reference-form-modal/reference-form.modal';
import { FormElementFactory } from '../form-elements/form-element-factory';
import { FormFactory } from '../form-elements/form-factory.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { NavigatorService } from '../../Services/navigator.service';
import { FetchFormDetailService } from '../../Services/openmrs-api/fetch-form-detail.service';
import { QuestionControlService } from '../../Services/question-control.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { FormSchemaCompiler } from '../../Services/schema-compiler.service';
import { NavigatorModalComponent } from '../../modals/navigator.modal';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit, OnDestroy {
  schema: any; // recursive schema could represent a question,section,page or form
  private _formSchema: any; // represents a FULL form schema
  private _count = 0;
  private _refElement: string;
  private rawSchema: any;
  private formName: string;
  private subscription: Subscription;
  prechecked: string;
  @Input() alias: string;
  addForm: FormGroup;
  editForm: FormGroup;
  editPageMode = false;
  editSectionMode = false;
  propertyModelArray: any;
  editMode: boolean;
  updateMode: boolean;
  selectMode: boolean;
  checkedRefElements: any[] = []; // selected elements to be referenced
  referencedForms: any[]; // an array of referencedForms metadata
  referencedFormsSchemas: any[];
  excludedQuestions: string[] = [];
  _componentToHighlight: string;
  @Input() mode: string; // can be either select or edit
  @Input() pageIndex: number; // aids in collapsing the navigator elements
  @Input() sectionIndex: number; // aids in collapsing the navigator elements
  @Input() questionIndex: number;
  @Input() set referenceElement(refElement) {
    this._refElement = refElement;
  } // element to be referenced if select mode
  @Input() set count(count) {
    this._count = count;
  } // keeps count of recursive calls
  @Input() set _schema(schema: any) {
    this.schema = schema;
  }
  @Input() set _rawSchema(schema: any) {
    this.rawSchema = schema;
  }
  @Input() set formSchema(fschema: any) {
    this._formSchema = _.clone(fschema);
  }
  @Input() set componentToHighlight(formName: string) {
    this._componentToHighlight = formName;
    this.alias = this.getComponentFormAlias(formName);
  }
  @Output() closeSidebar: EventEmitter<boolean> = new EventEmitter();
  @Output() checkedRefElementsEmitter: EventEmitter<any[]> = new EventEmitter();
  @Output() nestedCheckedRefElementEmitter: EventEmitter<
    any
  > = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private ns: NavigatorService,
    private qcs: QuestionControlService,
    private formElementFactory: FormElementFactory,
    private dialogService: DialogService,
    private fs: FetchFormDetailService,
    private fsc: FormSchemaCompiler,
    private formFactory: FormFactory
  ) {}

  ngOnInit() {
    this.showSpinner();

    this.ns.prechecked.subscribe((res) => {
      this.prechecked = res;
    });
    this.subscription = this.fs
      .getReferencedFormsSchemasArray()
      .subscribe((res) => {
        this.referencedForms = res;
      });
    this.subscription = this.ns.getRawSchema().subscribe((res) => {
      if (!_.isEmpty(res)) {
        this.rawSchema = _.cloneDeep(res);
      }
    });

    if (this.mode === 'edit') {
      this.editMode = true;
      this.selectMode = false;
      this.updateMode = false;
    } else if (this.mode === 'update') {
      this.selectMode = false;
      this.editMode = false;
      this.updateMode = true;
    } else {
      this.selectMode = true;
      this.editMode = false;
      this.updateMode = false;
    }
    this.subscription = this.ns.getExcludedQuestions().subscribe((res) => {
      if (res !== '') {
        this.excludedQuestions.push(res);
      } else {
        this.excludedQuestions = [];
      }
    });
  }

  getComponentFormAlias(uuid: string): string {
    let alias = '';
    _.each(this._formSchema.referencedForms, (form: any) => {
      if (form.uuid === uuid) {
        alias = form.alias;
      }
    });
    return alias;
  }

  // when element is clicked in navigator
  onClicked(
    selectedSchema,
    pageIndex?: number,
    sectionIndex?: number,
    questionIndex?: number,
    parentQuestionIndex?: number
  ) {
    if (this.selectMode) {
      return;
    }
    const schemaObj = {};
    schemaObj['selectedSchema'] = selectedSchema;
    schemaObj['pageIndex'] = pageIndex;
    schemaObj['sectionIndex'] = sectionIndex;
    schemaObj['questionIndex'] = questionIndex;
    this.ns.setClickedElementSchema(schemaObj);

    if (
      pageIndex !== undefined &&
      sectionIndex !== undefined &&
      questionIndex !== undefined &&
      parentQuestionIndex !== undefined
    ) {
      if (this.rawSchema.pages[pageIndex].label) {
        if (this.rawSchema.pages[pageIndex].sections[sectionIndex].label) {
          this.ns.setClickedElementRawSchema(
            this.rawSchema.pages[pageIndex].sections[sectionIndex].questions[
              questionIndex
            ].questions[parentQuestionIndex]
          );
          return;
        } else {
          this.ns.setClickedElementRawSchema(
            this.rawSchema.pages[pageIndex].sections[sectionIndex]
          );
          return;
        }
      } else {
        this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex]);
      }
    } else if (
      pageIndex !== undefined &&
      sectionIndex !== undefined &&
      questionIndex !== undefined
    ) {
      if (this.rawSchema.pages[pageIndex].label) {
        if (this.rawSchema.pages[pageIndex].sections[sectionIndex].label) {
          this.ns.setClickedElementRawSchema(
            this.rawSchema.pages[pageIndex].sections[sectionIndex].questions[
              questionIndex
            ]
          );
          return;
        } else {
          this.ns.setClickedElementRawSchema(
            this.rawSchema.pages[pageIndex].sections[sectionIndex]
          );
          return;
        }
      } else {
        this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex]);
        return;
      }
    } else if (pageIndex !== undefined && sectionIndex !== undefined) {
      if (this.rawSchema.pages[pageIndex].label) {
        this.ns.setClickedElementRawSchema(
          this.rawSchema.pages[pageIndex].sections[sectionIndex]
        );
        return;
      } else {
        this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex]);
      }
    } else if (selectedSchema['name']) {
      this.ns.setClickedElementRawSchema(this.rawSchema);
    } else {
      this.ns.setClickedElementRawSchema(this.rawSchema.pages[pageIndex]);
      return;
    }
  }

  showEditForm(schema: any, pageIndex: number, sectionIndex?: number) {
    this.propertyModelArray = this.qcs.toPropertyModelArray(schema);
    this.editForm = this.qcs.toFormGroup(this.propertyModelArray);

    if (schema.sections) {
      // page
      this.showEditDialog(this.propertyModelArray, this.editForm, pageIndex);
    } else {
      // section
      this.showEditDialog(
        this.propertyModelArray,
        this.editForm,
        pageIndex,
        sectionIndex
      );
    }
  }

  showAddForm(element: string, pageIndex?: number) {
    if (element === 'page') {
      const newPage = this.formElementFactory.createFormElement(element, {
        label: ''
      });
      this.propertyModelArray = this.qcs.toPropertyModelArray(newPage);
      this.addForm = this.qcs.toFormGroup(this.propertyModelArray);
      this.showAddDialog(this.propertyModelArray, this.addForm);
    } else {
      const newSection = this.formElementFactory.createFormElement(element, {});
      this.propertyModelArray = this.qcs.toPropertyModelArray(newSection);
      this.addForm = this.qcs.toFormGroup(this.propertyModelArray);
      this.showAddDialog(this.propertyModelArray, this.addForm, pageIndex);
    }
  }

  showDeleteDialog(
    schema: any,
    element: string,
    pageIndex: number,
    sectionIndex?: number,
    questionIndex?: number,
    parentQuestionIndex?: number
  ) {
    this.subscription = this.dialogService
      .addDialog(
        ConfirmComponent,
        {
          title: 'Delete ' + element,
          message: 'Are you sure you want to delete ' + schema.label
        },
        {
          backdropColor: 'rgba(0,0, 0, 0.5)'
        }
      )
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          if (element === 'page') {
            this.deletePage(pageIndex);
          } else if (element === 'section') {
            this.deleteSection(pageIndex, sectionIndex);
          } else {
            this.deleteQuestion(
              pageIndex,
              sectionIndex,
              questionIndex,
              parentQuestionIndex
            );
          }
        }
      });
  }

  showEditDialog(propModelArray, form, pageIndex, sectionIndex?) {
    if (sectionIndex > -1) {
      this.subscription = this.dialogService
        .addDialog(PromptComponent, {
          title: 'Edit Section',
          questions: propModelArray,
          form: form
        })
        .subscribe((formValue) => {
          if (formValue) {
            this.editSection(formValue, pageIndex, sectionIndex);
          }
        });
    } else {
      this.subscription = this.dialogService
        .addDialog(PromptComponent, {
          title: 'Edit Page',
          questions: propModelArray,
          form: form
        })
        .subscribe((formValue) => {
          if (formValue) {
            this.editPage(formValue['label'], pageIndex);
          }
        });
    }
  }

  showAddDialog(propModelArray, form, pageIndex?) {
    if (pageIndex !== undefined && pageIndex > -1) {
      this.subscription = this.dialogService
        .addDialog(
          PromptComponent,
          {
            title: 'Create Section',
            questions: propModelArray,
            form: form
          },
          {
            backdropColor: 'rgba(255, 255, 255, 0.5)'
          }
        )
        .subscribe((formValue) => {
          if (formValue !== undefined) {
            this.addSection(formValue, pageIndex);
          }
        });
    } else {
      this.subscription = this.dialogService
        .addDialog(
          PromptComponent,
          {
            title: 'Create Page',
            questions: propModelArray,
            form: form
          },
          {
            backdropColor: 'rgba(255, 255, 255, 0.5)'
          }
        )
        .subscribe((formValue) => {
          if (formValue) {
            this.addPage(formValue['label']);
          }
        });
    }
  }

  editPage(label, pageIndex) {
    if (this.rawSchema.pages[pageIndex].label) {
      this._formSchema.pages[pageIndex].label = label;
      this.rawSchema.pages[pageIndex].label = label;
      this.setSchema(this._formSchema);
      this.setRawSchema(this.rawSchema);
    } else {
      this.showAlertDialog('You cannot edit a referenced page.');
      return false;
    }
  }

  editSection(value, pageIndex, sectionIndex) {
    if (this.rawSchema.pages[pageIndex].label) {
      if (this.rawSchema.pages[pageIndex].sections[sectionIndex].label) {
        this.schema['sections'][sectionIndex].label = value.label;
        this.schema['sections'][sectionIndex].isExpanded = value.isExpanded;
        this._formSchema.pages[pageIndex] = this.schema;
        this.rawSchema.pages[pageIndex] = this.schema;
        this.setSchema(this._formSchema);
        this.setRawSchema(this.rawSchema);
      } else {
        this.showAlertDialog('You cannot edit a referenced section.');
        return false;
      }
    } else {
      this.showAlertDialog('You cannot edit a referenced page.');
      return false;
    }
  }

  editQuestion(
    question: any,
    pageIndex: number,
    sectionIndex: number,
    questionIndex: number,
    parentQuestionIndex?: number
  ) {
    const schemaObj = {};
    schemaObj['selectedSchema'] = question;
    schemaObj['pageIndex'] = pageIndex;
    schemaObj['sectionIndex'] = sectionIndex;
    schemaObj['questionIndex'] = questionIndex;
    schemaObj['parentQuestionIndex'] = parentQuestionIndex;
    this.ns.setClickedElementSchema(schemaObj); // set the current edited question in the schema editor

    this.propertyModelArray = this.qcs.toPropertyModelArray(question);
    if (parentQuestionIndex !== undefined && parentQuestionIndex > -1) {
      // thy art an obsgroup question!
      this.ns.newQuestion(
        this.propertyModelArray,
        pageIndex,
        sectionIndex,
        questionIndex,
        parentQuestionIndex
      );
    } else {
      this.ns.newQuestion(
        this.propertyModelArray,
        pageIndex,
        sectionIndex,
        questionIndex,
        undefined,
        schemaObj['selectedSchema']
      );
    }
  }

  addPage(label: string) {
    if (!this.doesPageExist(label)) {
      const newPage = this.formElementFactory.createFormElement('page', {
        label: label
      });
      this.rawSchema.pages.push(newPage);
      this._formSchema.pages.push(newPage);
      this.ns.setSchema(this._formSchema);
      this.ns.setRawSchema(this.rawSchema);
      this.onClicked(newPage, this.rawSchema.pages.length - 1);
    } else {
      this.showAlertDialog(
        'Page already exists! \n Try creating one with a different label!'
      );
    }
  }

  addSection(value, pageIndex: number) {
    const newSection = this.formElementFactory.createFormElement('section', {
      label: value.label,
      isExpanded: value.isExpanded
    });

    if (this.rawSchema.pages[pageIndex].label) {
      this.rawSchema.pages[pageIndex].sections.push(newSection);
      this._formSchema.pages[pageIndex].sections.push(newSection);
      this.setSchema(this._formSchema);
      this.setRawSchema(this.rawSchema);
      this.onClicked(
        newSection,
        pageIndex,
        this.rawSchema.pages[pageIndex].sections.length - 1
      );
    } else {
      this.showAlertDialog('You cannot add a section to a referenced page.');
    }
  }

  addQuestion(pageIndex: number, sectionIndex: number, questionIndex?: number) {
    const newQuestion = this.formElementFactory.createFormElement(
      'question',
      {}
    );
    const propertyModelArray = this.qcs.toPropertyModelArray(newQuestion);
    if (questionIndex !== undefined) {
      this.ns.newQuestion(
        propertyModelArray,
        pageIndex,
        sectionIndex,
        questionIndex
      ); // obsGroup
      this.onClicked(
        newQuestion,
        pageIndex,
        sectionIndex,
        questionIndex,
        this.rawSchema.pages[pageIndex].sections[sectionIndex].questions[
          questionIndex
        ].questions.length - 1
      );
    } else {
      this.ns.newQuestion(propertyModelArray, pageIndex, sectionIndex);
      this.onClicked(
        newQuestion,
        pageIndex,
        sectionIndex,
        this.rawSchema.pages[pageIndex].sections[sectionIndex].questions
          .length - 1
      );
    }
  }

  deletePage(pageIndex) {
    this._formSchema.pages.splice(pageIndex, 1);
    this.rawSchema.pages.splice(pageIndex, 1);
    this.setSchema(this._formSchema);
    this.setRawSchema(this.rawSchema);
  }

  deleteSection(pageIndex, sectionIndex) {
    this._formSchema.pages[pageIndex].sections.splice(sectionIndex, 1);
    this.rawSchema.pages[pageIndex].sections.splice(sectionIndex, 1);
    this.setSchema(this._formSchema);
    this.setRawSchema(this.rawSchema);
  }

  deleteQuestion(pageIndex, sectionIndex, questionIndex, parentQuestionIndex) {
    if (parentQuestionIndex !== undefined) {
      this._formSchema.pages[pageIndex].sections[sectionIndex].questions[
        parentQuestionIndex
      ].questions.splice(questionIndex, 1);
      this.rawSchema.pages[pageIndex].sections[sectionIndex].questions[
        parentQuestionIndex
      ].questions.splice(questionIndex, 1);
    } else {
      this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(
        questionIndex,
        1
      );
      this.rawSchema.pages[pageIndex].sections[sectionIndex].questions.splice(
        questionIndex,
        1
      );
    }

    this.setSchema(this._formSchema);
    this.setRawSchema(this.rawSchema);
  }

  doesPageExist(label: string): boolean {
    let result = false;

    this._formSchema.pages.forEach((page) => {
      if (Object.is(label.toLowerCase(), page.label.toLowerCase())) {
        result = true;
      }
    });
    return result;
  }

  addReferencePage() {
    if (this.referencedForms.length > 0) {
      this.subscription = this.dialogService
        .addDialog(
          ReferenceModalComponent,
          {
            refElement: 'Page'
          },
          {
            backdropColor: 'rgba(0, 0, 0, 0.5)'
          }
        )
        .subscribe((res) => {
          if (res !== undefined) {
            this.createRefPages(JSON.parse(res));
          }
        });
    } else {
      this.showAlertDialog('Insert reference form first');
    }
  }

  addReferenceSection(pageIndex) {
    this.ns.setExcludedQuestions('');
    if (this.referencedForms.length > 0) {
      this.subscription = this.dialogService
        .addDialog(
          ReferenceModalComponent,
          {
            refElement: 'Section'
          },
          {
            backdropColor: 'rgba(0, 0, 0, 0.5)'
          }
        )
        .subscribe((res) => {
          if (res !== undefined) {
            this.createRefSections(JSON.parse(res), pageIndex);
          }
        });
    } else {
      this.showAlertDialog('Insert reference form first');
    }
  }

  addReferenceQuestion(pageIndex, sectionIndex, questionIndex?) {
    if (this.referencedForms.length > 0) {
      this.subscription = this.dialogService
        .addDialog(
          ReferenceModalComponent,
          {
            refElement: 'Question'
          },
          {
            backdropColor: 'rgba(0,0,0,0.5)'
          }
        )
        .subscribe((res) => {
          if (res !== undefined) {
            // this.createRefQuestions(JSON.parse(res),pageIndex,sectionIndex,questionIndex)
          }
        });
    }
  }

  setCheckedReferenceElement(event, element?) {
    let ev;
    let el;
    if (element) {
      ev = event;
      el = element;
    } else {
      ev = event.event;
      el = event.element;
    }

    if (ev.target.checked) {
      this.checkedRefElements.push(el);
    } else {
      if (this.checkedRefElements.length > 0) {
        this.checkedRefElements.forEach((checkedRefElement, index) => {
          if (
            typeof checkedRefElement !== 'object' &&
            checkedRefElement === el
          ) {
            this.checkedRefElements.splice(index, 1);
          } else if (
            typeof checkedRefElement === 'object' &&
            JSON.stringify(el) === JSON.stringify(checkedRefElement)
          ) {
            this.checkedRefElements.splice(index, 1);
          }
        });
      }
    }

    if (this.schema['pages']) {
      this.checkedRefElementsEmitter.emit(this.checkedRefElements);
    }
  }

  emitCheckedReferenceElement(event, element) {
    const e = {};
    e['event'] = event;
    e['element'] = element;
    this.nestedCheckedRefElementEmitter.emit(e);
  }

  closeNav() {
    this.closeSidebar.emit(true);
  }

  createRefPages(res) {
    const formProps = this.createBasicFormProps();

    for (const el of JSON.parse(res['Pages'])) {
      let obj: any = {};
      obj['reference'] = {
        form: res.form,
        page: el
      };
      formProps['pages'].push(obj);

      obj = JSON.stringify(obj);

      this.rawSchema.pages.push(JSON.parse(obj));
    }

    const mockForm = this.formFactory.createForm(formProps);
    const compiledForm = this.fsc.compileFormSchema(
      mockForm,
      this.referencedForms
    );
    compiledForm['pages'].forEach((page) => {
      if (this.doesPageExist(page.label)) {
        this.showAlertDialog(
          page.label +
            ' already exists! \n Try referencing one with a different label'
        );
      } else {
        this._formSchema.pages.push(page);
        this.setSchema(this._formSchema);
        this.setRawSchema(this.rawSchema);
      }
    });
  }

  createRefSections(res, pageIndex) {
    const formProps = this.createBasicFormProps(pageIndex);
    const formAlias = res.form;
    for (const el of JSON.parse(res['Sections'])) {
      let obj: any = {};
      if (this.excludedQuestions.length > 0) {
        obj['reference'] = {
          form: res.form,
          page: el.page,
          section: el.section,
          excludeQuestions: this.addExcludedQuestions(res.form, el)
        };
      } else {
        obj['reference'] = {
          form: res.form,
          page: el.page,
          section: el.section
        };
      }

      formProps['pages'][0]['sections'].push(obj);
      obj = JSON.stringify(obj);

      if (!this.rawSchema.pages) {
        this.showAlertDialog(
          'You cannot reference a section in a referenced page! Please create a new page in order to reference this section.'
        );
        return false;
      } else {
        if (!this.sectionExist(pageIndex, JSON.parse(obj).reference.section)) {
          this.rawSchema.pages[pageIndex].sections.push(JSON.parse(obj));
        }
      }
    }
    const mockForm = this.formFactory.createForm(formProps);
    const compiledForm = this.fsc.compileFormSchema(
      mockForm,
      this.referencedForms
    );

    compiledForm['pages'][0]['sections'].forEach((section) => {
      if (!this.sectionExist(pageIndex, section.label)) {
        this._formSchema.pages[pageIndex].sections.push(section);
      }
    });
    this.setSchema(this._formSchema);
    this.setRawSchema(this.rawSchema);
  }

  sectionExist(pageIndex, sectionlabel) {
    let exist = false;
    this._formSchema.pages[pageIndex].sections.forEach((section) => {
      if (section.label === sectionlabel) {
        exist = true;
      }
    });
    return exist;
  }

  // createRefQuestions(res,pageIndex,sectionIndex,questionIndex?){
  // 	console.log(res)
  // 	let formProps=this.createBasicFormProps(pageIndex,sectionIndex)
  // 	for(var el of JSON.parse(res['Questions'])){
  // 		let obj = {}
  // 		  obj['reference']={"form":res.form, "page":el.page, "section":el.section, "question":el.question}
  // 		  formProps['pages'][0]['sections'][0].questions.push(obj)

  // 	}
  // 	 let mockForm = this.formFactory.createForm(formProps)
  // 	 let compiledForm = this.fsc.compileFormSchema(mockForm,this.referencedForms)
  // 	 console.log(compiledForm)
  // console.log(compiledForm)
  // compiledForm['pages'][0]['sections'][0]['questions'].forEach(
  // 	question => {
  // 		if(questionIndex!==undefined){
  // 			this._formSchema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].push(question)
  // 		}
  // 		else{
  // 			this._formSchema.pages[pageIndex].sections[sectionIndex].questions.push(question)
  // 		}
  // 	}
  // )

  // }

  createBasicFormProps(pageIndex?, sectionIndex?) {
    const formProps = {};
    formProps['name'] = this.rawSchema.name;
    formProps['uuid'] = this.rawSchema.uuid;
    formProps['processor'] = this.rawSchema.processor;
    formProps['referencedForms'] = this.rawSchema.referencedForms;
    formProps['pages'] = [];

    if (pageIndex !== undefined && sectionIndex !== undefined) {
      formProps['pages'].push(
        this.formElementFactory.createFormElement('page', {
          label: this._formSchema.pages[pageIndex].label
        })
      );

      formProps['pages'][0].sections.push(
        this.formElementFactory.createFormElement('section', {
          label: this._formSchema.pages[pageIndex].sections[sectionIndex].label,
          questions: []
        })
      );
      return formProps;
    }
    if (pageIndex !== undefined) {
      formProps['pages'].push(
        this.formElementFactory.createFormElement('page', {
          label: this._formSchema.pages[pageIndex].label
        })
      );
      return formProps;
    } else {
      return formProps;
    }
  }

  addExcludedQuestions(res, el) {
    const exQ = this.excludedQuestions;
    const formAlias = res;
    const final = [];
    const acceptedQuestionIds = [];
    let referencedFormDits = [];

    this.fs.getReferencedFormsDetails().subscribe((dits) => {
      referencedFormDits = _.cloneDeep(dits);
      referencedFormDits.forEach((form) => {
        if ((form.alias = formAlias)) {
          this.referencedForms.forEach((form$, index) => {
            if (form$.name === form.formName) {
              form$.pages.forEach((page, pageIndex) => {
                if (page.label === el.page) {
                  form$.pages[pageIndex].sections.forEach(
                    (section, sectionIndex) => {
                      if (section.label === el.section) {
                        form$.pages[pageIndex].sections[
                          sectionIndex
                        ].questions.forEach((question) => {
                          if (question.id) {
                            acceptedQuestionIds.push(question.id);
                          }
                        });
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    });

    acceptedQuestionIds.forEach((questionID) => {
      exQ.forEach((excludedQuestionId) => {
        if (excludedQuestionId === questionID) {
          final.push(excludedQuestionId);
        }
      });
    });
    return final;
  }

  excludeQuestion(
    pageIndex,
    sectionIndex,
    questionIndex,
    parentQuestionIndex,
    questionID
  ) {
    if (parentQuestionIndex !== undefined) {
      this._formSchema.pages[pageIndex].sections[sectionIndex].questions[
        parentQuestionIndex
      ].questions.splice(questionIndex, 1);
    } else {
      this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(
        questionIndex,
        1
      );
    }
    // this.findAndReplaceReferenceFormByName(this._formSchema.name,this._formSchema);

    this.ns.setExcludedQuestions(questionID);
  }

  // excludeSection(pageIndex,sectionIndex){
  // 	this._formSchema.pages[pageIndex].sections.splice(sectionIndex,1);
  // 	this.findAndReplaceReferenceFormByName(this._formSchema.name,this._formSchema)
  // }

  findAndReplaceReferenceFormByName(name: string, schema: Object) {
    this.referencedForms.forEach((form, index) => {
      if (form.name === name) {
        this.referencedForms.splice(index, 1, schema);
      }
    });
  }

  showAlertDialog(message: string) {
    this.dialogService.addDialog(AlertComponent, {
      message: message
    });
  }

  setRawSchema(obj) {
    this.ns.setRawSchema(obj);
  }

  setSchema(schema: Object) {
    this.ns.setSchema(this._formSchema);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editFormName(value: any) {
    this._formSchema.name = value.formname;
    this.rawSchema.name = value.formname;
    this.setSchema(this._formSchema);
    this.setRawSchema(this.rawSchema);
  }

  showNameEditForm(name: string) {
    this.formName = name;
    this.schema['name'] = '';
  }

  showSpinner() {
    try {
      if (!_.isEmpty(this._formSchema.pages)) {
        const lastPageIndex = this._formSchema.pages.length - 1;
        if (!_.isEmpty(this._formSchema.pages[lastPageIndex].sections)) {
          const lastSectionIndex =
            this._formSchema.pages[lastPageIndex].sections.length - 1;
          if (
            this._formSchema.pages[lastPageIndex].sections[lastSectionIndex]
          ) {
            if (
              this._formSchema.pages[lastPageIndex].sections[lastSectionIndex]
                .questions
            ) {
              const lastQuestionIndex =
                this._formSchema.pages[lastPageIndex].sections[lastSectionIndex]
                  .questions.length - 1;
              this.fs.setLoaded(true);
            }
          } else {
            this.fs.setLoaded(true);
          }
        } else {
          this.fs.setLoaded(true);
        }
      } else {
        this.fs.setLoaded(true);
      }
    } catch (e) {
      console.error(e);
    }
  }

  IsPageReferenced(pageIndex) {
    let isReferenced = false;
    if (!this.rawSchema.pages[pageIndex].label) {
      isReferenced = true;
    }
    return isReferenced;
  }

  IsSectionReferenced(pageIndex, sectionIndex) {
    let isReferenced = false;
    if (this.selectMode) {
      return false;
    }
    if (this.rawSchema.pages[pageIndex].label) {
      if (!this.rawSchema.pages[pageIndex].sections[sectionIndex].label) {
        isReferenced = true;
      }
    } else {
      isReferenced = true;
    }

    return isReferenced;
  }

  IsSectionOnlyReferenced(pageIndex, sectionIndex) {
    let result = false;
    let section: any = {};
    if (!this.IsPageReferenced(pageIndex)) {
      section = this.rawSchema.pages[pageIndex].sections[sectionIndex];
      if (section.reference) {
        result = true;
      } else {
        result = true;
      }
    }
    return result;
  }

  editReferenceSection(pageIndex, sectionIndex: any) {
    const section = this.rawSchema.pages[pageIndex].sections[sectionIndex];

    this.ns.setPrechecked(section.reference.section);
    _.forEach(this.rawSchema.referencedForms, (form: any) => {
      if (_.isEqual(section.reference.form, form.alias)) {
        this.fs.fetchFormMetadata(form.ref.uuid, true).then((metadata) => {
          this.fs
            .fetchForm(metadata.resources[0].valueReference, true)
            .then((schema) => {
              this.subscription = this.dialogService
                .addDialog(
                  NavigatorModalComponent,
                  {
                    title: `Edit Referenced Section`,
                    schema: schema,
                    referenceElement: 'section'
                  },
                  {
                    backdropColor: 'rgba(0, 0, 0, 0.5)'
                  }
                )
                .subscribe((res) => {
                  if (res) {
                    this.createRefSections(
                      {
                        form: form.alias,
                        Sections: res
                      },
                      pageIndex
                    );
                  }
                });
            });
        });
      }
    });
  }

  excludeQuestionFromReferencedSection(pageIndex, sectionIndex, k, questionId) {
    this._formSchema.pages[pageIndex].sections[sectionIndex].questions.splice(
      k,
      1
    );
    const section = this.rawSchema.pages[pageIndex].sections[sectionIndex];
    if (this.isSectionCustomized(section)) {
      this.rawSchema.pages[pageIndex].sections[
        sectionIndex
      ].excludeQuestions.push(questionId);
    } else {
      section['reference']['excludeQuestions'] = [questionId];
      this.rawSchema.pages[pageIndex].sections[sectionIndex] = section;
    }
    this.setRawSchema(this.rawSchema);
    this.setSchema(this._formSchema);
  }

  isSectionCustomized(section) {
    let isCustomized = false;
    if (section.excludeQuestions) {
      isCustomized = true;
    }
    return isCustomized;
  }

  checkMode(pageIndex: number, sections: any[]): boolean {
    let result = false;

    if (this.editMode || this.selectMode) {
      result = true;
    }

    if (this.updateMode) {
      if (this.IsPageReferenced(pageIndex)) {
        if (this.rawSchema.pages[pageIndex].reference.form === this.alias) {
          return true;
        }
      }

      if (!_.isEmpty(sections)) {
        _.each(sections, (section) => {
          if (!section.label) {
            if (section.reference.form === this.alias) {
              result = true;
            }
          }
        });
      }
    }
    return result;
  }

  IsSectionReferencedFromComponent(pageIndex, sectionIndex): boolean {
    let results = false;
    if (this.editMode || this.selectMode) {
      results = true;
    } else if (this.IsPageReferenced(pageIndex)) {
      return true;
    } else if (this.updateMode) {
      if (this.IsSectionReferenced(pageIndex, sectionIndex)) {
        if (
          this.rawSchema.pages[pageIndex].sections[sectionIndex].reference
            .form === this.alias
        ) {
          results = true;
        }
      }
    }

    return results;
  }
}
