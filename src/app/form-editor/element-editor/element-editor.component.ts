import { Component, OnInit, Input} from '@angular/core';
import {PropertyModel} from '.././models/property-model';
import {FormGroup, FormArray, FormControl} from '@angular/forms';
import {QuestionControlService} from '../../Services/question-control.service';
import {FormElementFactory} from '.././form-elements/form-element-factory';

@Component({
  selector: 'app-element-editor',
  templateUrl: './element-editor.component.html',
  styleUrls: ['./element-editor.component.css']
})
export class ElementEditorComponent implements OnInit {
  questions:PropertyModel<any>[];

  form: FormGroup;
  @Input() page: any;
  @Input() section: any;
  allPossibleproperties:Array<any>;
  constructor(private qcs: QuestionControlService, private formElementFactory:FormElementFactory) { }
  
  @Input() set _questions(questions){
    this.questions = questions
    this.form = this.qcs.toFormGroup(this.questions);
  }
  

  ngOnInit() {
      this.form = this.qcs.toFormGroup(this.questions);
      this.allPossibleproperties = this.qcs.getAllPossibleProperties();
  }


  addProperty(prop){

    if(this.form.contains(prop)) {alert("Property already added!"); return;}
    
    let obj = {};
    obj[prop] = "";
    let newField = this.qcs.toPropertyModelArray(obj);

    if(newField.length > 0){
    this.form.addControl(prop,new FormControl(""))
    this.questions.push(newField[0])
    }
  }

  
  onSubmit(){
    console.log(this.form.value)
  }


  delete(i){
    this.form.removeControl(this.questions[i].key)
    this.questions.splice(i,1);
  }

}
