import { Component, OnInit, Input} from '@angular/core';
import {PropertyModel} from '.././models/property-model';
import {FormGroup, FormArray, FormControl} from '@angular/forms';
import {QuestionControlService} from '../../Services/question-control.service';
import {NavigatorService} from '../../Services/navigator.service';
import {QuestionIdService} from '../../Services/question-id.service'
import {FormElementFactory} from '.././form-elements/form-element-factory';
import {AlertComponent} from '../../modals/alert.component'
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-element-editor',
  templateUrl: './element-editor.component.html',
  styleUrls: ['./element-editor.component.css']
})
export class ElementEditorComponent implements OnInit {
  questions:PropertyModel<any>[];
  _schema:any
  form: FormGroup;
  @Input() pageIndex: number;
  @Input() sectionIndex: number;
  @Input() pageStr: string;
  @Input() sectionStr: string;
  @Input() questionIndex:number;  //if editMode
  allPossibleproperties:Array<any>;
  addMode:boolean = false;
  editMode:boolean = false;
  id:number; //ID to the current edited question


  constructor(private qcs: QuestionControlService, private formElementFactory:FormElementFactory, 
    private qis:QuestionIdService,private ns:NavigatorService,private dialogService:DialogService) { }
  
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
      //breadcrumbs setup
      this.pageStr = this._schema.pages[this.pageIndex].label;
      this.sectionStr = this._schema.pages[this.pageIndex].sections[this.sectionIndex].label;
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
    
    if(!this.checkId(this.form.get('id').value)) return;
    let question = this.qcs.unflatten(this.form.value);

    if(this.addMode){
     this._schema.pages[this.pageIndex].sections[this.sectionIndex].questions.push(question);
     this.ns.setSchema(this._schema);
     this.form.reset()
    }
    if(this.editMode){
      this._schema.pages[this.pageIndex].sections[this.sectionIndex].questions.splice(this.questionIndex,1,question)
      this.ns.setSchema(this._schema);
    }

    
    
  }


  delete(i){
    this.form.removeControl(this.questions[i].key)
    this.questions.splice(i,1);
    console.log(this.questions);
  }

  setMode(form:FormGroup){
    if(this.form.get('label').value=="") {
      console.log("addMode");
      this.editMode=false;
      this.addMode=true;
    }
    else {
      this.editMode=true;
      this.addMode=false;
      this.id=this.form.get('id').value
      console.log("editMode")
    }
  }

  checkId(id):boolean{
      if(this.form.contains('id')){
      let _id = this.form.get('id').value;
      let ids = this.qis.getIDs(this._schema);
      let count = 0;
      for(var id of ids) if(id==_id) count++;
      if(this.editMode&&this.id!==_id&&count>0) {
        this.showAlert("ID exists \n Try using a different ID");
         return false;}
      else if(this.addMode&&count>0){
        this.showAlert("ID exists \n Try using a different ID"); 
        return false;}
      else {return true;}
    }
  }

  showAlert(message:string){
    
    this.dialogService.addDialog(AlertComponent, {message:message});

  }




}
