import { Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import {PropertyModel} from '.././models/property-model';
import {FormGroup, FormArray, FormControl} from '@angular/forms';
import {QuestionControlService} from '../../Services/question-control.service';
import {NavigatorService} from '../../Services/navigator.service';
import {QuestionIdService} from '../../Services/question-id.service'
import {FormElementFactory} from '.././form-elements/form-element-factory';
import {AlertComponent} from '../../modals/alert.component'
import { DialogService } from "ng2-bootstrap-modal";
import {ElementEditorService} from '../../Services/element-editor.service';
import {Question} from '../form-elements/Question';
import {SchemaModalComponent} from '../../modals/schema-editor.modal';
import { ALL_PROPERTIES } from '../models/properties';
import * as _ from "lodash";

@Component({
  selector: 'app-element-editor',
  templateUrl: './element-editor.component.html',
  styleUrls: ['./element-editor.component.css']
})
export class ElementEditorComponent implements OnInit {
  questions:PropertyModel<any>[];
  _rawSchema: any;
  _schema:any
  form: FormGroup;
  setMembers:any[] = [];
  @Input() pageIndex: number;
  @Input() sectionIndex: number;
  @Input() questionIndex:number;  //if editMode or addMode obsGroup Question
  @Input() parentQuestionIndex:number;
  @Input() set rawSchema(rawSchema){this._rawSchema=_.cloneDeep(rawSchema)}; //if edit obsGroup question
  @Output() closeComponent:EventEmitter<boolean>=new EventEmitter(); 
  pageStr: string;
  sectionStr: string;
  questionStr: string;
  allPossibleproperties:Array<any>;
  addMode:boolean = false;
  editMode:boolean = false;
  id:number; //ID to the current edited question

  answers:Object;


  constructor(private qcs: QuestionControlService, private formElementFactory:FormElementFactory, 
    private qis:QuestionIdService,private ns:NavigatorService,private dialogService:DialogService, private el:ElementEditorService) { 
      
    
    }

   
  @Input() set schema(schema){
    this._schema = _.clone(schema);
  }
  
  @Input() set _questions(questions){
    this.questions = questions
    this.form = this.qcs.toFormGroup(this.questions);
    this.setMode(this.form)
    this.breadcrumbsSetup();
    
  }

  
  ngOnInit() {
    console.log(this.qis.getIDs(this._schema));
      this.form = this.qcs.toFormGroup(this.questions);
      this.setMode(this.form);
      this.allPossibleproperties = ALL_PROPERTIES;
      this.breadcrumbsSetup();
      this.el.getSetMembers().subscribe((setMembers) => {
        this.setMembers=[];
        setMembers.forEach((setMember) =>{
          let rendering="text";
          if(setMember.answers.length>0) {rendering="select"}
          let question:Question = {
            label: setMember.label,
            type:'obs',
            id:'',
            questionOptions:{
              rendering:rendering,
            }

          }
          question.questionOptions['concept']=setMember.concept;
          if(!_.isEmpty(setMember.answers)) question.questionOptions['answers']=setMember.answers;
          this.form.controls['type'].setValue('obsGroup');
          this.form.controls['questionOptions.rendering'].setValue('group');
          this.setMembers.push(question);
        });
       

      });
  }


  addProperty(prop){
    
    if(this.form.contains(prop)) {this.showAlert("Property already added!"); return;}
    
    let obj = {};
    obj[prop] = "";
    let newField = this.qcs.toPropertyModelArray(obj); //TODO: do not depend on qcs to create new property model. fix this! prop is already a propertymodel.

    if(newField.length > 0){
    this.form.addControl(prop,new FormControl(""))
    this.questions.push(newField[0])
    }
  }

  
  onSubmit(){
    if(!this.form.contains('label')||!this.form.contains('questionOptions.rendering')||!this.form.contains('type'))
      { this.showAlert("Some mandatory question properties are missing! \n A question must include: type,label,redering and id") }

    if(this.form.contains('id')){
      if(!this.checkId(this.form.get('id').value)) return;
    }
    

    let question = this.qcs.unflatten(this.form.value);

    if(question['type']=="obsGroup"){
      question['questions']=this.setMembers;
    }

    if(question['validators']){
      question['validators']=this.parse(this.form.controls['validators'].value);
    }

    if(question['alert']){
      question['alert']=this.parse(this.form.controls['alert'].value);
    }

    if(question['hide']){
      question['hide']=this.parse(this.form.controls['hide'].value);
    }

    if(question.questionOptions['answers']){
      question.questionOptions['answers']=this.parse(this.form.controls['questionOptions.answers'].value);
    }

    // if(question.questionOptions['answers']&&question['type']=="testOrder"){
    //   question.questionOptions['selectableOrders'] = _.cloneDeep(question.questionOptions['answers']);
    //   delete question.questionOptions['answers'];
    // }
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
      let ids = this.qis.getIDs(this._rawSchema);
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
    console.log(answers,"Element Editor!");
    this.answers = answers; //selectedAnswers
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
        this.form.removeControl('questionOptions.answers');
        this.removeQuestion('questionOptions.answers');
      }
      else{
        return;
      }
      
    }
    


  
  }

  addQuestion(question:any,pageIndex:number,sectionIndex:number,questionIndex?:number){

    if(questionIndex!==undefined){ //obsGroup question
      console.log('has parent!');
      if(this._rawSchema.pages[pageIndex].label ){
        if(this._rawSchema.pages[pageIndex].sections[sectionIndex].label ){
          this._schema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].questions.push(question);
          this._rawSchema.pages[pageIndex].sections[sectionIndex].questions[questionIndex].questions.push(question);
        }
        else{
          this.showAlert("You cannot add a question to a referenced section.");
          return;
        }
        
      }
      else{
        this.showAlert("You cannot add a question to a referenced page.");
        return;
      }
      
    }

    else{

      
      if(this._rawSchema.pages[pageIndex].label){
        if(this._rawSchema.pages[pageIndex].sections[sectionIndex].label ){
          this._rawSchema.pages[pageIndex].sections[sectionIndex].questions.push(question);
          this._schema.pages[pageIndex].sections[sectionIndex].questions.push(question);
        }
        else{
          this.showAlert("You cannot add a question to a referenced section.");
          return;
        }
      }

      else{
        this.showAlert("You cannot add a question to a referenced page.");
        return;
      }
      
    }
    this.ns.setSchema(this._schema);
    this.ns.setRawSchema(this._rawSchema)
    this.form.reset();
    this.closeElementEditor();
  }


  editQuestion(question,pageIndex,sectionIndex,questionIndex,parentQuestionIndex?){
  
    if(parentQuestionIndex!==undefined){

      if(this._rawSchema.pages[pageIndex].label){
        if(this._rawSchema.pages[pageIndex].sections[sectionIndex].label ){
          this._schema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1,question);
          this._rawSchema.pages[pageIndex].sections[sectionIndex].questions[parentQuestionIndex].questions.splice(questionIndex,1,question);
        }
        else{
          this.showAlert("You cannot edit a question of a referenced section");
          return;
        }
      }
        

      else{
        this.showAlert("You cannot edit a question of a referenced page");
        return;
      }
      
    }
    else{
      console.log(questionIndex)
      
      if(this._rawSchema.pages[pageIndex].label  ){
          if(this._rawSchema.pages[pageIndex].sections[sectionIndex].label){
            this._schema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex,1,question);
            this._rawSchema.pages[pageIndex].sections[sectionIndex].questions.splice(questionIndex,1,question);
          }
          else{
            this.showAlert("You cannot edit a question of a referenced section.");
            return;
          }
        
      }
      
      else{
        this.showAlert("You cannot edit a question of a referenced page.");
        return;
      }
    
    }
    this.ns.setSchema(this._schema);
    this.ns.setRawSchema(this._rawSchema)
  }
  

  checkQuestion(question){
    if(question.key=='label' || question.key=='type' || question.key=='questionOptions.rendering'){
      return false;
    }
    return true;
  }

  typeSelected(type:string){
    if(type=='obs'){
      if(!this.form.contains('questionOptions.concept')) this.addProperty('questionOptions.concept');
    }
  }


  renderingSelected(rendering:string){
    switch(rendering){
      case 'number':
        this.removePreviousFields(rendering);
        if(!this.form.contains('questionOptions.max')&&!this.form.contains('questionOptions.min')){
          this.addProperty('questionOptions.max');
          this.addProperty('questionOptions.min');
          this.addProperty('questionOptions.showDate');
        }
        break;

      case 'textarea':
        this.removePreviousFields(rendering);
        if(!this.form.contains('questionOptions.rows')){
          this.addProperty('questionOptions.rows');
         }
        break;
      
      case 'date':
         this.removePreviousFields(rendering);
         if(!this.form.contains('questionOptions.showWeeks')){
          this.addProperty('questionOptions.showWeeks');
         }
        break;

      default:
         this.removePreviousFields(rendering);
        
    }
  }

  reselectAnswers(){
    if(this.answers!=undefined) this.el.reShowAnswersDialog(this.answers);
    else this.el.reShowAnswersDialog(JSON.parse(this.form.controls['questionOptions.answers'].value));
  }

  closeElementEditor(){
    this.closeComponent.emit(true);
  }

  viewSetMembers(){
    this.dialogService.addDialog(SchemaModalComponent,{schema:JSON.stringify(this.setMembers,null,4),title:"Set Members Schema"});
  }

  reselectSetMembers(){
    this.el.reShowSetMembersDialog(this.setMembers);
  }

  removePreviousFields(rendering:string){
    switch(rendering){
      case 'number':
      this.removeDateRelatedFields();
      this.removeTextAreaRelatedFields();
      break;

      case 'textarea':
      this.removeNumberRelatedFields();
      this.removeDateRelatedFields();
      break;
       
  
      case 'date':
        this.removeNumberRelatedFields();
        this.removeTextAreaRelatedFields();
        break;

      default:
        this.removeDateRelatedFields();
        this.removeNumberRelatedFields();
        this.removeTextAreaRelatedFields();
        break;


    }
  }

  removeQuestion(qn){
      let i;
      this.questions.forEach((question,index) => {
        if(question['key']==qn)
          i=index;
      })
      this.questions.splice(i,1)
    
  }

  showDate($event){
    if($event==true){
      if(!this.form.contains('questionOptions.showDateOptions')) this.addProperty('questionOptions.showDateOptions');
    }
    else{
      this.form.removeControl('questionOptions.showDate');
      this.removeQuestion('questionOptions.showDate');
    }
  }

  removeTextAreaRelatedFields(){
    if(this.form.contains("questionOptions.rows")) {
      this.form.removeControl('questionOptions.rows');
      this.removeQuestion('questionOptions.rows');
    } 
  }

  removeNumberRelatedFields(){
    if(this.form.contains('questionOptions.max')){
      this.removeQuestion('questionOptions.max');
      this.form.removeControl('questionOptions.max');
    } 
    if(this.form.contains('questionOptions.min')) {
      this.form.removeControl('questionOptions.min');
      this.removeQuestion('questionOptions.min');
    } 

    if(this.form.contains('questionOptions.showDate')){
      this.form.removeControl('questionOptions.showDate');
      this.removeQuestion('questionOptions.showDate');
    }
  }

  removeDateRelatedFields(){
    if(this.form.contains("questionOptions.showWeeks")) {
      this.form.removeControl('questionOptions.showWeeks');
      this.removeQuestion('questionOptions.showWeeks');
    } 
  }
}
    