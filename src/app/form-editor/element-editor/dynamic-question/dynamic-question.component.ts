import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyModel } from '../../models/property-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['./dynamic-question.component.css']
})
export class DynamicQuestionComponent implements OnInit {
  @Input() question: PropertyModel<any>;
  form: FormGroup;
  @Output() qtype:EventEmitter<string> = new EventEmitter<string>(); //for questions only

  @Input() set _form(form){
  console.log("New form")
  this.form = form;
}
  constructor() {}

  ngOnInit() {
    
  }



get isValid(){
    return this.form.controls[this.question.key].valid;
  }


typeSelected(questionKey){
  
  if(questionKey=="type"){
    this.qtype.emit(this.form.controls[questionKey].value);
  }
}
}
