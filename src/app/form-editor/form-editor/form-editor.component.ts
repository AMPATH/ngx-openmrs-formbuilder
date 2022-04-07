import { mergeMap } from 'rxjs/operators';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewChecked,
  AfterContentInit
} from '@angular/core';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { FetchFormDetailService } from '../../Services/openmrs-api/fetch-form-detail.service';
import { FetchAllFormsService } from '../../Services/openmrs-api/fetch-all-forms.service';
import { NavigatorService } from '../../Services/navigator.service';
import { QuestionIdService } from '../../Services/question-id.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { DialogService } from 'ng2-bootstrap-modal';
import { Form } from '../form-elements/Form';
import { LocalStorageService } from '../../Services/storage/local-storage.service';
import { SessionStorageService } from '../../Services/storage/session-storage.service';
import { Constants } from '../../Services/constants';
import { SaveFormsComponent } from '../../modals/save-form-modal/save-form-modal';
import { ConfirmComponent } from '../../modals/confirm.component';
import { AlertComponent } from '../../modals/alert.component';
import { FormListService } from '../../Services/form-list.service';
import { SaveFormService } from '../../Services/openmrs-api/save-form.service';
import { EncounterTypeService } from '../../Services/openmrs-api/encounter-type.service';
import { ConceptService } from '../../Services/openmrs-api/concept.service';
import { NotificationComponent } from '../snackbar/notification-toast';
import * as _ from 'lodash';
import { Question } from '../form-elements/Question';
import { FormSchemaCompiler } from '@ampath-kenya/ngx-openmrs-formentry';

interface FormMetadata {
  name: string;
  uuid: string;
  valueReference: string;
  resourceUUID: string;
  version: string;
  description: string;
  encounterType: string;
  auditInfo: any;
  published: boolean;
}

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.css']
})
export class FormEditorComponent
  implements OnInit, OnDestroy, AfterViewChecked, AfterContentInit {
  schema: any;
  selectedSchema: any;
  rawSelectedSchema: any;
  errorMessage = '';
  strSchema: string;
  rawSchema: any;
  questions: any;
  user: string;
  url: string;
  page: any; // to add new question
  section: any; // to add new section
  question: any;
  parentQuestion: any;
  strRawSchema: string;
  subscription: Subscription;
  disableCanDeactivate = false;
  viewMode: string;
  formMetadata: FormMetadata;
  encounterTypes: any[];
  @ViewChild('sidenav') public myNav;
  loading = true;
  questionSchema: any;
  formType: string;
  previousVersionUUID: string;

  constructor(
    private fs: FetchFormDetailService,
    private navigatorService: NavigatorService,
    public snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private localStorageService: LocalStorageService,
    private cdRef: ChangeDetectorRef,
    private fectAllFormsService: FetchAllFormsService,
    private formListService: FormListService,
    private saveFormService: SaveFormService,
    private encounterTypeService: EncounterTypeService,
    private sessionStorageService: SessionStorageService,
    private conceptService: ConceptService,
    private formSchemaCompiler: FormSchemaCompiler,
    private fetchFormDetailService: FetchFormDetailService
  ) {}

  closeElementEditor() {
    this.questions = undefined;
  }

  closeNavigator(event) {
    this.myNav.close();
  }

  openNavigator() {
    this.myNav.open();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterContentInit() {
    this.loading = true;
  }

  ngOnInit() {
    this.loading = true;
    this.viewMode = this.getViewMode(); // default view mode
    this.user = this.sessionStorageService.getObject('user').username;
    this.url = this.sessionStorageService.getItem('url');
    this.fectAllFormsService.getFormType().subscribe((res) => {
      if (res !== '') {
        this.formType = res;
        this.localStorageService.setItem('formType', this.formType);
      }
    });

    this.formMetadata = {
      name: '',
      uuid: '',
      valueReference: '',
      resourceUUID: '',
      version: null,
      encounterType: '',
      description: '',
      auditInfo: {},
      published: false
    };

    this.fs.setReferencedFormsSchemasArray([]);
    this.subscription = this.fs.loaded().subscribe((isLoaded) => {
      if (isLoaded) {
        this.loading = false;
      }
    });

    this.subscription = this.route.params.subscribe((params) => {
      const uuid = params['uuid'];

      if (uuid === 'new') {
        this.createNewForm();
      } else if (uuid === 'restoredForm') {
        if (
          this.fs.restoreReferencedForms(
            this.localStorageService.getObject(Constants.RAW_SCHEMA)
          )
        ) {
          this.fs
            .restoreReferencedForms(
              this.localStorageService.getObject(Constants.RAW_SCHEMA)
            )
            .then((res) => {
              this.setFormEditor(
                this.localStorageService.getObject(Constants.SCHEMA),
                this.localStorageService.getObject(Constants.RAW_SCHEMA),
                this.localStorageService.getObject(Constants.FORM_METADATA)
              );
            });
        } else {
          this.setFormEditor(
            this.localStorageService.getObject(Constants.SCHEMA),
            this.localStorageService.getObject(Constants.RAW_SCHEMA)
          );
        }
        this.formType = this.localStorageService.getItem('formType');
      } else {
        console.log('Get form', uuid);
        this.formMetadata.uuid = uuid;
        this.fs
          .fetchFormMetadata(this.formMetadata.uuid, false)
          .then((metadata) => {
            this.formMetadata.version = metadata.version;
            this.formMetadata.name = metadata.name;
            if (metadata.encounterType) {
              this.formMetadata.encounterType = metadata.encounterType.display;
            }
            if (metadata.description) {
              this.formMetadata.description = metadata.description;
            }
            this.formMetadata.auditInfo = metadata.auditInfo;
            this.formMetadata.published = metadata.published;
            // this.saveFormMetadata(this.formMetadata); // save form metadata to local storage for retrieval later on
            console.log('Resources', metadata.resources);
            if (metadata.resources.length) {
              this.formMetadata.valueReference =
                metadata.resources[0].valueReference || '';
              this.formMetadata.resourceUUID = metadata.resources[0].uuid;
              this.fetchForm(metadata.resources[0].valueReference);
            } else {
              this.createFormForMissingResource();
            }

            _.includes(this.formMetadata.name, Constants.COMPONENT)
              ? this.localStorageService.setItem(
                  Constants.FORM_TYPE,
                  Constants.COMPONENT
                )
              : this.localStorageService.setItem(
                  Constants.FORM_TYPE,
                  Constants.POC
                );
          })
          .catch((e) => {
            this.loading = false;
            console.error(e);
            alert('Check your internet connection and CORS then refresh.');
          });
      }
    });

    this.subscription = this.navigatorService
      .getRawSchema()
      .subscribe((res) => {
        this.rawSchema = res;
        this.strRawSchema = JSON.stringify(this.rawSchema, null, '\t');
        if (this.localStorageService.getObject(Constants.SCHEMA)) {
          if (
            this.rawSchema.name ===
            this.localStorageService.getObject(Constants.SCHEMA).name
          ) {
            this.saveRawDraft(this.rawSchema); // only save when compiled version exists in memory.
          }
        }
      });

    this.subscription = this.navigatorService
      .getClickedElementRawSchema()
      .subscribe((res) => {
        if (res) {
          this.rawSelectedSchema = res;
          this.strRawSchema = JSON.stringify(
            this.rawSelectedSchema,
            null,
            '\t'
          );
        }
      });
    // prevent from saving form metadata.
    // on navigator element clicked for editing
    this.subscription = this.navigatorService
      .getClickedElementSchema()
      .subscribe((res) => {
        this.selectedSchema = res;
        this.strSchema = JSON.stringify(
          this.selectedSchema.selectedSchema,
          null,
          '\t'
        );
      });

    // on element added/deleted/modified
    this.subscription = this.navigatorService.getSchema().subscribe((res) => {
      this.schema = res;
      this.strSchema = JSON.stringify(this.schema, null, '\t');
      this.saveDraft(this.schema);
      this.saveFormMetadata(this.formMetadata);
      this.showSuccessToast('Schema Updated!');
    });

    this.subscription = this.navigatorService
      .getNewQuestion()
      .subscribe((res) => {
        this.questions = res['propModelArray'];
        this.page = res['pageIndex'];
        this.section = res['sectionIndex'];
        this.question = res['questionIndex'];
        this.parentQuestion = res['parentQuestionIndex'];
        this.questionSchema = res['schema'];
        this.myNav.close();
      });

    // getting new form metadata after saving remotely
    this.subscription = this.saveFormService
      .getNewResourceUUID()
      .subscribe((uuid) => (this.formMetadata.resourceUUID = uuid));
    this.subscription = this.saveFormService
      .getNewValueReference()
      .subscribe((value) => (this.formMetadata.valueReference = value));
    this.subscription = this.saveFormService
      .getNewEncounterType()
      .subscribe(
        (encounterType) => (this.formMetadata.encounterType = encounterType)
      );
    this.subscription = this.saveFormService
      .getNewFormUUID()
      .subscribe((uuid) => {
        this.previousVersionUUID = this.formMetadata.uuid;
        this.formMetadata.uuid = uuid;
        this.disableCanDeactivate = true;
        //FIXME This call should be uncessary but for some reason openmrs does not return forms resources on the after call after saving
        this.fs.fetchFormMetadata(uuid, false).then((form) => {
          this.router.navigate(['/edit', form.uuid]);
        });
      });

    this.subscription = this.saveFormService
      .getNewFormName()
      .subscribe((res) => {
        this.formMetadata.name = res;
        this.saveFormMetadata(this.formMetadata);
      });

    this.subscription = this.saveFormService
      .getNewVersion()
      .subscribe((res) => {
        this.formMetadata.version = res;
        this.saveFormMetadata(this.formMetadata);
      });

    this.subscription = this.encounterTypeService
      .getEncounterTypes()
      .subscribe((res) => (this.encounterTypes = res.results));
  }

  fetchForm(value) {
    this.fs
      .fetchForm(value, false)
      .then((res) => {
        if (this.checkIfSchemaProperlyCompiled(res.pages)) {
          this.setFormEditor(res, this.fs.rawSchema);
        }
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
        this.viewMode = 'badSchema';
        this.errorMessage = error.message;
        this.fs.fetchForm(value, true).then((schema) => {
          this.strRawSchema = JSON.stringify(schema, null, '\t');
        });
      });
  }

  createNewForm() {
    this.loading = false;
    this.localStorageService.clear(); // clear local storage
    const schema = new Form({
      name: '',
      processor: 'EncounterFormProcessor',
      uuid: 'xxxx',
      referencedForms: [],
      pages: []
    });
    this.setFormEditor(schema, schema);
  }

  createFormForMissingResource() {
    this.loading = false;
    const schema = new Form({
      name: this.formMetadata.name,
      processor: 'EncounterFormProcessor',
      uuid: 'xxxx',
      referencedForms: [],
      pages: []
    });
    this.setFormEditor(schema, schema);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  canDeactivate() {
    if (!this.disableCanDeactivate) {
      return confirm(
        'Are you sure you want to navigate away from this page and lose all changes?'
      );
    } else {
      return true;
    }
  }

  checkIfSchemaProperlyCompiled(elements): boolean {
    let bool = true;
    const ets = [];
    elements.forEach((element) => {
      if (!element.label) {
        this.loading = false;
        ets.push(element);
        bool = false;
        return bool;
      } else {
        if (element.sections) {
          this.checkIfSchemaProperlyCompiled(element.sections);
        }
        if (element.questions) {
          this.checkIfSchemaProperlyCompiled(element.questions);
        }
      }
    });

    if (ets.length > 0) {
      this.alertUser(ets);
    }
    return bool;
  }

  alertUser(elements) {
    alert(
      'This form cannot be edited because the some referenced elements was not found.' +
        'Please check the respective components if these elements exist then retry \n \n' +
        JSON.stringify(elements, null, 2)
    );
    this.disableCanDeactivate = true;
    this.router.navigate(['/forms']);
  }

  showSuccessToast(message: string) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 1500,
      data: message
    });
  }
  showNotificationMessage(message: string) {
    this.snackbar.open(message, '', {
      duration: 1200
    });
  }
  setFormEditor(schema, rawSchema, formMetadata?) {
    this.selectedSchema = schema;
    this.schema = schema;
    this.strSchema = JSON.stringify(schema, null, '\t');
    this.rawSchema = rawSchema;
    this.navigatorService.setRawSchema(this.rawSchema);
    this.strRawSchema = JSON.stringify(this.rawSchema, null, '\t');
    if (formMetadata) {
      this.formMetadata = formMetadata;
    } // if form is being restored from local storage, retrieve metadata.
  }

  saveLocally(silently?: boolean) {
    this.saveDraft(this.schema);
    this.saveRawDraft(this.rawSchema);
    this.saveFormMetadata(this.formMetadata);
    if (!silently) {
      this.showSaveSnackbar();
    }
  }

  saveRemotely() {
    this.saveLocally(true);
    if (this.formMetadata.published || !_.isEmpty(this.formMetadata.uuid)) {
      let message = '';
      if (this.formMetadata.published) {
        message =
          'This form has been published. Would you want to overwrite the existing form?';
      } else if (!_.isEmpty(this.formMetadata.uuid)) {
        message = 'Would you want to update the form or save as a new version?';
      }
      this.dialogService
        .addDialog(
          ConfirmComponent,
          {
            title: 'Confirm Save',
            message: message,
            buttonText: 'Update current version'
          },
          {
            backdropColor: 'rgba(0,0, 0, 0.5)'
          }
        )
        .subscribe((decision) => {
          if (decision === 1) {
            // overwrite existing form
            this.showSaveDialog('overwrite');
          }

          if (decision === 2) {
            // save as a new version
            this.showSaveDialog('new', '0');
          }
        });
    } else {
      this.showSaveDialog('new', '0');
    }
    this.saveLocally(true);
  }

  showSaveDialog(operation: string, newVersion?: string) {
    const dialogTitle =
      this.formType === Constants.POC ? 'POC FORM' : 'Component';
    this.dialogService
      .addDialog(
        SaveFormsComponent,
        {
          title: `Save ${dialogTitle}`,
          operation: operation,
          name: this.formMetadata.name,
          uuid: this.formMetadata.uuid,
          version: newVersion || this.formMetadata.version,
          encounterType: this.formMetadata.encounterType,
          description: this.formMetadata.description,
          rawSchema: this.rawSchema,
          valueReference: this.formMetadata.valueReference,
          resourceUUID: this.formMetadata.resourceUUID,
          encounterTypes: this.encounterTypes,
          published: this.formMetadata.published
        },
        {
          backdropColor: 'rgba(255, 255, 255, 0.5)'
        }
      )
      .subscribe((res) => {
        this.formMetadata.name.indexOf('component') > -1
          ? (this.formType = Constants.COMPONENT)
          : (this.formType = Constants.POC);
        if (
          res &&
          this.formType === Constants.COMPONENT &&
          operation === 'new'
        ) {
          this.disableCanDeactivate = true;
          this.dialogService
            .addDialog(
              ConfirmComponent,
              {
                message:
                  'Would you like to update forms referencing this component as well?',
                title: 'Update forms',
                buttonText: 'OK'
              },
              {
                backdropColor: 'rgba(0,0,0,0.5)'
              }
            )
            .subscribe((confirmed) => {
              if (confirmed) {
                this.router.navigate([
                  '/update',
                  this.previousVersionUUID,
                  this.formMetadata.uuid
                ]);
              }
            });
        }
      });
  }

  toggleView() {
    this.viewMode = this.viewMode === 'singleView' ? 'multiView' : 'singleView';
    localStorage.setItem('viewMode', this.viewMode);
  }

  showSaveSnackbar() {
    this.snackbar.open('Saved Locally!', '', {
      duration: 1200
    });
  }

  saveDraft(schema: any) {
    this.localStorageService.setObject(Constants.SCHEMA, schema);
    this.localStorageService.setObject(Constants.TIME_STAMP, Date.now());
  }

  saveRawDraft(rawSchema: any) {
    this.localStorageService.setObject(Constants.RAW_SCHEMA, rawSchema);
  }

  saveFormMetadata(formMetadata) {
    this.localStorageService.setObject(Constants.FORM_METADATA, formMetadata);
  }

  publish(form, index) {
    let forms = [];
    const sameFormsDifferentVersion = [];
    this.subscription = this.fectAllFormsService
      .fetchAllPOCForms()
      .subscribe((POCForms: any) => {
        forms = _.cloneDeep(POCForms.results); // currently only poc forms version 1
        const formName = this.formListService.removeVersionInformation(
          this.formMetadata.name
        );
        forms.splice(index, 1);
        const formsWithoutVersionedNames = this.formListService.removeVersionInformationFromForms(
          forms
        );

        formsWithoutVersionedNames.forEach(($form) => {
          if ($form.name === formName) {
            sameFormsDifferentVersion.push($form);
          }
        });

        if (!_.isEmpty(sameFormsDifferentVersion)) {
          sameFormsDifferentVersion.forEach((_form) => {
            if (_form.published) {
              POCForms.results.forEach((pocform) => {
                if (pocform.uuid === _form.uuid) {
                  this.dialogService
                    .addDialog(
                      ConfirmComponent,
                      {
                        title: 'Confirm publish',
                        message:
                          'There is already a version of this form published.' +
                          'Would you like to unpublish that version and publish this one?',
                        buttonText: 'Publish'
                      },
                      {
                        backdropColor: 'rgba(0,0,0,0.5)'
                      }
                    )
                    .subscribe((isConfirmed) => {
                      if (isConfirmed) {
                        this.saveFormService
                          .unpublish(pocform.uuid)
                          .subscribe((res) =>
                            this.saveFormService
                              .publish(this.formMetadata.uuid)
                              .subscribe((ress) => {
                                this.showSuccessToast(
                                  'Form Successfully Published!'
                                );
                                this.formMetadata.published = true;
                              })
                          );
                      }
                    });
                }
              });
            } else {
              this.showSuccessToast('Form Successfully Published!');
              this.saveFormService
                .publish(this.formMetadata.uuid)
                .subscribe((res) => (this.formMetadata.published = true)); // if none of the other versions are published.
            }
          });
        } else {
          this.saveFormService
            .publish(this.formMetadata.uuid)
            .subscribe((res) => {
              this.showSuccessToast('Form Successfully Published!');
              this.formMetadata.published = true;
            });
        }
      });
  }

  unpublish() {
    this.saveFormService
      .unpublish(this.formMetadata.uuid)
      .subscribe((res) => (this.formMetadata.published = false));
  }

  loadFormBuilder($event) {
    this.viewMode = this.getViewMode();
  }

  exit() {
    this.router.navigate(['/forms']);
  }

  getViewMode() {
    return localStorage.getItem('viewMode') || 'multiView';
  }

  validateConcepts() {
    const concepts = this.fetchAllConcepts();
    this.snackbar.openFromComponent(NotificationComponent, {
      data: ' Validating Concepts...'
    });
    this.conceptService.validateConcepts(concepts).subscribe(
      (res: any[]) => {
        const invalidConcepts = res.filter((concept) => !concept.valid);
        if (invalidConcepts.length > 0) {
          let errored_concepts = '\n';
          _.each(invalidConcepts, (concept) => {
            errored_concepts = errored_concepts + '\n' + concept.conceptUuid;
          });
          this.dialogService.addDialog(AlertComponent, {
            message: `The following concepts are invalid: ${errored_concepts}`
          });
          this.snackbar.dismiss();
        } else {
          this.showSuccessToast('All Concepts are valid');
        }
      },
      (error) => {
        this.snackbar.dismiss();
        this.dialogService.addDialog(AlertComponent, {
          message: `Unknown error validating concepts`
        });
      }
    );
  }

  fetchAllConcepts() {
    const concepts = [];
    const pages = this.schema.pages;
    _.each(pages, (page: any) => {
      _.each(page.sections, (section: any) => {
        _.each(section.questions, (question: any) => {
          if (question.questionOptions.concept) {
            concepts.push(question.questionOptions.concept);
          }
          if (question.questions) {
            _.each(question.questions, (nestedQuestion: any) => {
              if (nestedQuestion.questionOptions.concept) {
                concepts.push(nestedQuestion.questionOptions.concept);
              }
            });
          }
        });
      });
    });
    return concepts;
  }

  addConceptMappingsToForm(
    _schema,
    pIndex?,
    sIndex?,
    qIndex?,
    pqIndex?,
    full?
  ) {
    const schema = _.cloneDeep(_schema);
    const fullSchema = full || _.cloneDeep(this.rawSchema);
    this.snackbar.openFromComponent(NotificationComponent, {
      data: ' Adding concept mappings...'
    });

    if (schema.pages) {
      _.forEach(schema.pages, (page, pageIndex: number) => {
        return this.addConceptMappingsToForm(
          page,
          pageIndex,
          undefined,
          undefined,
          undefined,
          fullSchema
        );
      });
    } else if (schema.sections) {
      _.forEach(schema.sections, (section, sectionIndex) => {
        return this.addConceptMappingsToForm(
          section,
          pIndex,
          sectionIndex,
          undefined,
          undefined,
          fullSchema
        );
      });
    } else if (schema.questions && !schema.type) {
      _.forEach(schema.questions, (question, index) => {
        this.addConceptMappingsToForm(
          question,
          pIndex,
          sIndex,
          index,
          undefined,
          fullSchema
        );
      });
    } else if (schema.questions && schema.type) {
      _.forEach(schema.questions, (question, pqindex) => {
        this.addConceptMappingsToForm(
          question,
          pIndex,
          sIndex,
          qIndex,
          pqIndex,
          fullSchema
        );
      });
    } else {
      if (schema.questionOptions) {
        if (schema.questionOptions.concept) {
          const concept = schema.questionOptions.concept;
          let conceptId;
          this.conceptService
            .getConceptID(concept)
            .pipe(
              mergeMap((conceptData) => {
                conceptId = conceptData;
                return this.conceptService.searchConceptByUUID(concept);
              })
            )
            .subscribe((res) => {
              const mappings = this.conceptService.createMappingsValue(
                res.mappings
              );
              if (mappings) {
                if (pqIndex) {
                  fullSchema.pages[pIndex].sections[sIndex].questions[
                    pqIndex
                  ].questions[qIndex] = this.addMappingAndIDToQuestion(
                    schema,
                    mappings,
                    conceptId
                  );
                } else {
                  fullSchema.pages[pIndex].sections[sIndex].questions[
                    qIndex
                  ] = this.addMappingAndIDToQuestion(
                    schema,
                    mappings,
                    conceptId
                  );
                }
                if (this.isLastQuestion(pIndex, sIndex, qIndex, pqIndex)) {
                  this.showSuccessToast('Finished mapping concepts!');
                  this.setFormEditorByRawSchema(fullSchema);
                }
              }
            });
        }
        if (schema.questionOptions.answers) {
          const answers = schema.questionOptions.answers;
          answers.forEach((answer, answerIndex) => {
            const concept = answer.concept;
            let conceptData;
            this.conceptService
              .searchConceptByUUID(concept)
              .pipe(
                mergeMap((r) => {
                  conceptData = r;
                  return this.conceptService.getConceptID(concept);
                })
              )
              .subscribe((res) => {
                const mappings = this.conceptService.createMappingsValue(
                  conceptData.mappings
                );
                if (mappings) {
                  if (pqIndex) {
                    fullSchema.pages[pIndex].sections[sIndex].questions[
                      pqIndex
                    ].questions[qIndex].answers[
                      answerIndex
                    ] = this.addMappingAndIdToAnswer(
                      answer,
                      mappings,
                      res[0].concept_id
                    );
                  } else {
                    fullSchema.pages[pIndex].sections[sIndex].questions[
                      qIndex
                    ].answers = this.addMappingAndIdToAnswer(
                      answer,
                      mappings,
                      res[0].concept_id
                    );
                  }
                }
              });
          });
        }
      }
    }
  }

  addMappingAndIDToQuestion(question: Question, mappings: any[], ID: any) {
    question.questionOptions.conceptMappings = mappings;
    question.questionOptions.conceptId = ID[0].concept_id;
    return question;
  }

  addMappingAndIdToAnswer(answer, mappings: any[], ID: string) {
    answer.conceptMappings = mappings;
    answer.conceptId = ID;
    return answer;
  }

  setFormEditorByRawSchema(rawSchema) {
    this.fs.getReferencedFormsSchemasArray().subscribe((refForms) => {
      this.rawSchema = rawSchema;
      const uncompiledSchema = _.cloneDeep(rawSchema);
      this.schema = this.formSchemaCompiler.compileFormSchema(
        uncompiledSchema,
        refForms
      );
      this.navigatorService.setRawSchema(this.rawSchema);
    });
  }
  isLastQuestion(pIndex?, sIndex?, qIndex?, pqIndex?): boolean {
    let answer = false;
    if (pqIndex) {
      if (pIndex === this.rawSchema.pages.length - 1) {
        if (sIndex === this.rawSchema.pages[pIndex].sections.length - 1) {
          if (
            qIndex ===
            this.rawSchema.pages[pIndex].sections[sIndex].questions.length - 1
          ) {
            if (
              pqIndex ===
              this.rawSchema.pages[pIndex].sections[sIndex].questions[qIndex]
                .questions.length -
                1
            ) {
              answer = true;
            }
          }
        }
      }
    } else {
      if (pIndex === this.rawSchema.pages.length - 1) {
        if (sIndex === this.rawSchema.pages[pIndex].sections.length - 1) {
          if (
            qIndex ===
            this.rawSchema.pages[pIndex].sections[sIndex].questions.length - 1
          ) {
            answer = true;
          }

          return answer;
        }
      }
    }
  }
}
