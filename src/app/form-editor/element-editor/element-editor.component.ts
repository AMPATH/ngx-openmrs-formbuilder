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
  @Input() questions:PropertyModel<any>[];

  form: FormGroup;
  payLoad: '';
  allPossibleproperties:Array<any>;
  possiblePropertiesAfterChangeEvent:Array<any>=[{name:"Select type first",type:"disabled"}]
  

  constructor(private qcs: QuestionControlService, private formElementFactory:FormElementFactory) { }

  ngOnInit() {
      this.form = this.qcs.toFormGroup(this.questions);
      this.allPossibleproperties = this.qcs.getAllPossibleProperties();
      
  }


  typeChanged(type){
    this.possiblePropertiesAfterChangeEvent = this.allPossibleproperties.filter(prop => prop.type == type || prop.type == "any" )
  }


  addProperty(prop){
    //check if form already has the control
    if(this.form.contains(prop)) {alert("Property already added!"); return;}
    //pass prop to propertymodel array
    let newField = this.qcs.toPropertyModelArray({"questionOptions.rendering":""});
    this.form.addControl(prop,new FormControl(""))
    this.questions.push(newField[0])
  }
  onSubmit(){
    console.log(this.form.value)
  }


  delete(i){

    this.form.removeControl(this.questions[i].key)
    this.questions.splice(i,1);
  }

}
