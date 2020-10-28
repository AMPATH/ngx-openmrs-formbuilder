import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { ConceptService } from '../../Services/openmrs-api/concept.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { AnswersComponent } from '../../modals/answers-modal/answers.modal';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConceptsModalComponent } from '../../modals/concept.modal';
import { SetMembersModalComponent } from '../../modals/set-members-modal/set-members-modal.component';
import { ElementEditorService } from '../../Services/element-editor.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

interface Answer {
  label: string;
  concept: string;
}

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() question: any;
  @Input() form: FormGroup;
  @Output() answers = new EventEmitter<any>();
  searching = false;

  searchResult: any;
  allAvailableAnswers: Array<any>; // after search result
  allAvailableSetMembers: Array<any>;
  previousSelectedAnswersIndexes: number[] = [];
  yesUUID: string;
  noUUID: string;

  constructor(
    private cs: ConceptService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private el: ElementEditorService
  ) {}

  ngOnInit() {
    this.subscription = this.el.reselectAnswers().subscribe((res) => {
      if (this.allAvailableAnswers !== undefined) {
        this.findIndexesOfPreviouslySelectedAnswers(
          res,
          this.allAvailableAnswers
        );
        this.showAnswersDialog(this.allAvailableAnswers);
      } else {
        this.getAnswers(this.form.controls[this.question.key].value);
      }
    });

    this.subscription = this.el.reselectSetMembers().subscribe((res) => {
      // set res to be checked
      this.showSetMembersDialog(this.allAvailableSetMembers);
    });

    this.getYesAndNoConceptUUID();
  }

  searchConcept() {
    const conceptID = this.form.controls[this.question.key].value;
    this.searching = true;

    if (!_.isEmpty(conceptID)) {
      if (conceptID.length === 36 && conceptID.indexOf(' ') === -1) {
        // searching with concept uuid
        this.subscription = this.cs
          .searchConceptByUUID(conceptID)
          .subscribe((res) => {
            this.searching = false;
            const arr = [];
            if (res !== []) {
              arr.push(res);
              this.showConceptsDialog(arr);
            } else {
              alert('No concept found!');
            }
          });
      } else {
        this.subscription = this.cs
          .searchConceptByName(conceptID)
          .subscribe((res) => {
            this.searchResult = res;
            this.searching = false;
            if (this.searchResult.results.length > 0) {
              this.showConceptsDialog(res.results);
            } else {
              alert('No concept found!');
            }
          });
      }
    }
  }

  getAnswers(conceptID) {
    this.subscription = this.cs
      .searchConceptByUUID(conceptID)
      .subscribe((res) => {
        if (res.answers && res.answers.length > 0) {
          this.allAvailableAnswers = res.answers;
          this.showAnswersDialog(this.allAvailableAnswers);
        } else {
          this.setSelectedAnswers([]);
        }
      });
  }

  showConceptsDialog(searchResults: any[]) {
    this.dialogService
      .addDialog(
        ConceptsModalComponent,
        {
          concepts: searchResults,
          title: 'Concepts'
        },
        {
          backdropColor: 'rgba(255, 255, 255, 0.5)'
        }
      )
      .subscribe((formValue) => {
        if (formValue) {
          this.setConcept(formValue);
          searchResults.forEach((concept) => {
            if (formValue['concept'] === concept.uuid) {
              this.setConceptId(concept.uuid);
              if (concept.answers.length > 0) {
                this.showAnswersDialog(concept.answers);
              }

              if (concept.mappings.length > 0) {
                this.setConceptMappings(concept.mappings);
              }

              if (concept.setMembers.length > 0) {
                this.showSetMembersDialog(concept.setMembers);
              }

              if (concept.datatype.name === 'Boolean') {
                const answers: Answer[] = [
                  {
                    label: 'yes',
                    concept: this.yesUUID
                  },
                  {
                    label: 'no',
                    concept: this.noUUID
                  }
                ];
                this.answers.emit(answers);
              }
            }
          });
        }
      });
  }

  getYesAndNoConceptUUID() {
    this.subscription = this.cs.searchConceptByName('yes').subscribe((res) => {
      if (res.results) {
        res.results.forEach((concept) => {
          if (concept.name.display.toLowerCase() === 'yes') {
            this.yesUUID = concept.uuid;
          }
        });
      }
    });

    this.subscription = this.cs.searchConceptByName('no').subscribe((res) => {
      if (res.results) {
        res.results.forEach((concept) => {
          if (concept.name.display.toLowerCase() === 'no') {
            this.noUUID = concept.uuid;
          }
        });
      }
    });
  }

  showAnswersDialog(results) {
    this.emitSetMembers([]);
    this.allAvailableAnswers = results;
    this.subscription = this.dialogService
      .addDialog(
        AnswersComponent,
        {
          answers: results
        },
        {
          backdropColor: 'rgba(255, 255, 255, 0.5)'
        }
      )
      .subscribe((selectedAnswersUuids) => {
        if (selectedAnswersUuids) {
          this.setSelectedAnswers(selectedAnswersUuids);
        }
      });
  }

  public setConceptId(uuid) {
    this.cs.getConceptID(uuid).subscribe((res) => {
      this.el.setConceptId(res[0].concept_id);
    });
  }

  showSetMembersDialog(setMembers) {
    this.allAvailableSetMembers = setMembers;
    this.subscription = this.dialogService
      .addDialog(
        SetMembersModalComponent,
        {
          setMembers: setMembers
        },
        {
          backdropColor: 'rgba(255, 255, 255, 0.5)'
        }
      )
      .subscribe((formValue) => {
        if (formValue) {
          this.emitSetMembers(JSON.parse(formValue));
        }
      });
  }

  setSelectedAnswers(strUuids) {
    const selectedAnswers = [];
    const uuids = JSON.parse(strUuids);
    _.forEach(uuids, (uuid) => {
      const ans = this.getAns(uuid);
      if (ans) {
        selectedAnswers.push(ans);
      }
    });
    if (selectedAnswers) {
      this.answers.emit(this.createSchemaAnswers(selectedAnswers));
    }
  }

  getAns(uuid: string): any[] {
    let answerObj;
    _.forEach(this.allAvailableAnswers, (answer) => {
      if (answer.uuid === uuid) {
        answerObj = answer;
      }
    });
    return answerObj;
  }

  createSchemaAnswers(answers: any[]) {
    const schemaAns = [];
    _.forEach(answers, (answer) => {
      const answerObj = {
        concept: answer.uuid,
        label: answer.display,
        conceptMappings: this.cs.createMappingsValue(answer.mappings)
      };
      schemaAns.push(answerObj);
    });
    return schemaAns;
  }

  setConcept(formValue) {
    this.form.controls['questionOptions.concept'].setValue(formValue.concept);
  }

  setConceptMappings(mappings) {
    this.el.setMappings(mappings);
  }

  keyDownFunction($event) {
    if (
      $event.keyCode === 13 &&
      this.form.controls[this.question.key].value !== ''
    ) {
      this.searchConcept();
    }
  }

  findIndexesOfPreviouslySelectedAnswers(
    previouslySelectedAnswers: any,
    allAvailableAnswers: any[]
  ) {
    const indexes = [];
    previouslySelectedAnswers.forEach((answer, index) => {
      if (_.indexOf(allAvailableAnswers, answer)) {
        indexes.push(index);
      }
    });
    console.log(indexes);
    return indexes;
  }

  emitSetMembers(setMembers: any[]) {
    this.el.setMembers(setMembers);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
