import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PropertyModel } from '../../models/property-model';
import { FormGroup,FormControl} from '@angular/forms';
import {ConceptComponent} from '../../concept/concept.component';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-question.component.html',
  styleUrls: ['./dynamic-question.component.css']
})
export class DynamicQuestionComponent implements OnInit {
  @Input() question: PropertyModel<any>;
  @Output() answers = new EventEmitter<any>();
  @Output() type = new EventEmitter<string>();
  
 
 

  form: FormGroup;
 

  @Input() set _form(form){
  console.log("New form")
  this.form = form;
}
  constructor() {}

  ngOnInit() {
    
  }


  typeSelected(selectBox:string){
    if(selectBox=='type'){
      let value = this.form.controls['type'].value;
      this.type.emit(value);
    }
  }


 isValid(){
    return this.form.controls[this.question.key].valid;
  }

emitAnswers(answers:any){
  this.answers.emit(answers);
}


}
