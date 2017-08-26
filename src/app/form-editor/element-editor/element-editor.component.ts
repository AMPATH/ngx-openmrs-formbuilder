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
  private questions:PropertyModel<any>[];
  private _rawSchema: any;
  _schema:any
  form: FormGroup;
  @Input() pageIndex: number;
  @Input() sectionIndex: number;
  @Input() questionIndex:number;  //if editMode or addMode obsGroup Question
  @Input() parentQuestionIndex:number;
  @Input() set rawSchema(rawSchema){this._rawSchema=rawSchema}; //if edit obsGroup question
 
  pageStr: string;
  sectionStr: string;
  questionStr: string;
  allPossibleproperties:Array<any>;
  addMode:boolean = false;
  editMode:boolean = false;
  id:number; //ID to the current edited question


  constructor(private qcs: QuestionControlService, private formElementFactory:FormElementFactory, 
    private qis:QuestionIdService,private ns:NavigatorService,private dialogService:DialogService) { 
  
    
    }

   
  @Input() set schema(schema){
    this._schema = schema
  }
  
  @Input() set _questions(questions){
    console.log(questions)
    this.questions = questions
    this.form = this.qcs.toFormGroup(this.questions);
    this.setMode(this.form)
    this.breadcrumbsSetup();
    
  }

  
  ngOnInit() {
      this.form = this.qcs.toFormGroup(this.questions);
      this.setMode(this.form)
      this.allPossibleproperties = this.qcs.getAllPossibleProperties();
      this.breadcrumbsSetup();
     
      
  }


  addProperty(prop){
    
    if(this.form.contains(prop)) {this.showAlert("Property already added!"); return;}
    
    let obj = {};
    obj[prop] = "";
    let newField = this.qcs.toPropertyModelArray(obj);

    if(newField.length > 0){
    this.form.addControl(prop,new FormControl(""))
    this.questions.push(newField[0])
    }
  }

  
  onSubmit(){
    if(!this.form.contains('id')||!this.form.contains('label')||!this.form.contains('questionOptions.rendering')||!this.form.contains('type'))
      { this.showAlert("Some mandatory question properties are missing! \n A question must include: type,label,redering and id") }

    if(!this.checkId(this.form.get('id').value)) return;

    let question = this.qcs.unflatten(this.form.value);

    if(question['type']=="obsGroup"){
      question['questions']=[]
    }

    if(question['validators']){
      question['validators']=this.parse(this.form.controls['validators'].value);
    }

    if(question['hide']){
      question['hide']=this.parse(this.form.controls['hide'].value);
    }

    if(question.questionOptions['answers']){
      question.questionOptions['answers']=this.parse(this.form.controls['questionOptions.answers'].value);
    }

    console.log(question)

    if(this.addMode){ 
      this.addQuestion(question,this.pageIndex,this.sectionIndex,this.questionIndex)
    }

    if(this.editMode){
      this.editQuestion(question,this.pageIndex,this.sectionIndex,this.questionIndex,this.parentQuestionIndex)
    }

    
    
  }

 breadcrumbsSetup(){
    this.pageStr = this._schema.pages[this.pageIndex].label;
    this.sectionStr = this._schema.pages[this.pageIndex].sections[this.sectionIndex].label;
    if(this.editMode&&this.questionIndex!=-1) this.questionStr = this._schema.pages[this.pageIndex].sections[this.sectionIndex].questions[this.questionIndex].label
    else this.questionStr = '';
 }

  parse(str){
    return JSON.parse(str);
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


  setAnswers(answers){
    if(answers.length>0){
      if(this.form.contains('questionOptions.answers')){
        this.form.controls['questionOptions.answers'].setValue(JSON.stringify(answers,undefined,"\t"));
      }
      else{
        let field = this.qcs.toPropertyModelArray({"questionOptions.answers":answers})
        this.form.addControl('questionOptions.answers',new FormControl(JSON.stringify(answers,undefined,"\t")))
        this.questions.push(field[0])
      }
    }

    else{
      if(this.form.controls['questionOptions.answers']){
        let i;
        this.questions.forEach((question,index) => {
          if(question.key==='questionOptions.answers')
            i=index;
        })
        this.questions.splice(i,1)
      }
      else{
        return;
      }
      
    }
    


  
  }

  addQuestion(question:any,pageIndex:number,sectionIndex:number,questionIndex?:number){

    if(questionIndex){ //obsGroup question
      this._schema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].questions.push(question);
      this._rawSchema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].questions.push(question);
    }

    else{
      this._schema.pages[pageIndex].sections[sectionIndex].questions.push(question);
      this._rawSchema.pages[pageIndex].sections[sectionIndex].questions.push(question);
    }
    this.ns.setSchema(this._schema);
    this.ns.setRawSchema(this._rawSchema)
    this.form.reset()
    
  }


  editQuestion(question,pageIndex,sectionIndex,questionIndex,parentQuestionIndex?){
  
    if(parentQuestionIndex){
      this._schema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1,question)
      this._rawSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1,question)
    }
    else{
      console.log(questionIndex)
      this._schema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex,1,question)
      this._rawSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex,1,question);
    
    }
    this.ns.setSchema(this._schema);
    this.ns.setRawSchema(this._rawSchema)
  }
  

  checkQuestion(question){
    if(question.key=='label'||question.key=='id'||question.key=='type'||question.key=='questionOptions.rendering'){
      return false;
    }
    return true;
  }
}
