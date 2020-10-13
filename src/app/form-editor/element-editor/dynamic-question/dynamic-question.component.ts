import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyModel } from '../../models/property-model';
import { FormGroup, FormControl } from '@angular/forms';
import { ConceptComponent } from '../../concept/concept.component';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['./dynamic-question.component.css']
})
export class DynamicQuestionComponent implements OnInit {
  @Input() question: PropertyModel<any>;
  @Output() answers = new EventEmitter<any>();
  @Output() type = new EventEmitter<string>();
  @Output() rendering = new EventEmitter<string>();
  @Output() showDate = new EventEmitter<boolean>();

  form: FormGroup;

  @Input() set _form(form) {
    this.form = form;
  }
  constructor() {}

  ngOnInit() {}

  isControlValid(controlName: string) {
    if (
      this.form.controls[controlName].valid ||
      this.form.controls[controlName].untouched
    ) {
      return true;
    } else {
      return false;
    }
  }

  typeSelected(selectBox: string) {
    if (selectBox == 'type') {
      let value = this.form.controls['type'].value;
      this.type.emit(value);
    }

    if (selectBox == 'questionOptions.rendering') {
      let value = this.form.controls['questionOptions.rendering'].value;
      this.rendering.emit(value);
    }

    if (selectBox == 'questionOptions.showDate') {
      let value = this.form.controls['questionOptions.showDate'].value;
      this.showDate.emit(value);
    }
  }

  isValid() {
    return this.form.controls[this.question.key].valid;
  }

  emitAnswers(answers: any) {
    this.answers.emit(answers);
  }

  onTextAreaChanged($event, question) {
    this.form.controls[question].setValue($event);
  }
}
