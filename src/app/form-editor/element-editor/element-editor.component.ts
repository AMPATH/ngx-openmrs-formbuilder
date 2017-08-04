import { Component, OnInit, Input} from '@angular/core';
import {PropertyModel} from '.././models/property-model';
import {FormGroup, FormArray, FormControl} from '@angular/forms';
import {QuestionControlService} from '../../Services/question-control.service';
import {QuestionIdService} from '../../Services/question-id.service'
import {FormElementFactory} from '.././form-elements/form-element-factory';

@Component({
  selector: 'app-element-editor',
  templateUrl: './element-editor.component.html',
  styleUrls: ['./element-editor.component.css']
})
export class ElementEditorComponent implements OnInit {
  questions:PropertyModel<any>[];
  _schema:any
  form: FormGroup;
  @Input() page: any;
  @Input() section: any;
  allPossibleproperties:Array<any>;
  addMode:boolean = false;
  editMode:boolean = false;
  id:number; //ID to the current edited question


  constructor(private qcs: QuestionControlService, private formElementFactory:FormElementFactory, private qis:QuestionIdService) { }
  
  @Input() set _questions(questions){
    this.questions = questions
    this.form = this.qcs.toFormGroup(this.questions);
    this.setMode(this.form)
  }
  
  @Input() set schema(schema){
    this._schema = schema
  }

  ngOnInit() {
      this.form = this.qcs.toFormGroup(this.questions);
      this.setMode(this.form)
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
    if(this.form.contains('id')){
      let _id = this.form.get('id').value;
      let ids = this.qis.getIDs(this._schema);
      let count = 0;
      for(var id of ids) if(id==_id) count++;
      if(this.editMode&&this.id!==_id&&count>0) alert("ID exists") 
      else if(this.addMode&&count>0) alert("ID exists")
      else {alert("question added successfully!"); console.log(this.form.value);}
    } 
  }


  delete(i){
    this.form.removeControl(this.questions[i].key)
    this.questions.splice(i,1);
  }

  setMode(form:FormGroup){
    if(this.form.get('label').value=="") {console.log("addMode");this.editMode=false;this.addMode=true;}
    else {
      this.editMode=true;
      this.addMode=false;
      this.id=this.form.get('id').value
      console.log("editMode")}
  }

}
