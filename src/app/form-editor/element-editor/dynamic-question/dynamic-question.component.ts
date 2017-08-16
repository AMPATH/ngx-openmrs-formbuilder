import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyModel } from '../../models/property-model';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['./dynamic-question.component.css']
})
export class DynamicQuestionComponent implements OnInit {
  @Input() question: PropertyModel<any>;
  @Output() answers = new EventEmitter<any>();
  form: FormGroup;
 

  @Input() set _form(form){
  console.log("New form")
  this.form = form;
}
  constructor() {}

  ngOnInit() {
    
  }



 isValid(){
    return this.form.controls[this.question.key].valid;
  }

emitAnswers(answers:any){
  this.answers.emit(answers)
}


}
