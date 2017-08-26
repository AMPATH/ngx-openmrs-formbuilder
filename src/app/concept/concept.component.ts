import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {ConceptService} from '../Services/concept.service'
import {DialogService} from "ng2-bootstrap-modal"
import {AnswersComponent} from "../modals/answers.modal"
import { FormGroup,FormBuilder,FormControl } from '@angular/forms'
import {ConceptsModalComponent} from '../modals/concept.modal'
@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {
@Input() question:any;
@Input() form:FormGroup;
@Output() answers = new EventEmitter<any>();
searching:boolean=false;

searchResult:any;
allAvailableAnswers:Array<any> //after search result

  constructor(private cs:ConceptService,private dialogService:DialogService,private fb:FormBuilder) { }

  ngOnInit() {
  }

  searchConcept(){
    let conceptID = this.form.controls[this.question.key].value
    this.searching = true;
    this.cs.searchConcept(conceptID).subscribe(res => {
      this.searchResult = res;
      this.searching = false;
      
      if(this.searchResult.results){
        this.showConceptsDialog(this.searchResult.results);
        
      }
      
      else{
       this.showConceptsDialog([{"uuid":this.searchResult.uuid, "display":this.searchResult.display}])
      }
     

    })
  }



  showAnswersDialog(results){
     this.dialogService.addDialog(AnswersComponent, {
      answers:results
     }, { backdropColor: 'rgba(255, 255, 255, 0.5)' })
      .subscribe((formValue)=>{
        if(formValue)
          this.setSelectedAnswers(formValue)
      });
  }

  setSelectedAnswers(obj){
   let answers = []
   
   if(obj.length>0){
    let jsobj = JSON.parse(obj);
    for(var answer in jsobj ){
     let label = jsobj[answer].slice(0,jsobj[answer].indexOf(','))
     let concept = jsobj[answer].slice(jsobj[answer].indexOf(',')+1)
     let temp = {"label":label,"concept":concept}
     answers.push(temp)
 }
   }
 
    this.answers.emit(answers)  
  }

  showConceptsDialog(searchResults){
   
    this.dialogService.addDialog(ConceptsModalComponent, {
      concepts:searchResults
     }, { backdropColor: 'rgba(255, 255, 255, 0.5)' })
      .subscribe((formValue)=>{
        if(formValue){
          this.setFormControlValue(formValue)
          this.cs.searchConcept(formValue['concept']).subscribe(
            res => {
            if(res.answers&&res.answers.length > 0) {
              this.allAvailableAnswers = res.answers;
              this.showAnswersDialog(this.allAvailableAnswers);
      }

      else{
        this.setSelectedAnswers([]);
      }
            }
          )
        }
          
      });
  }


  setFormControlValue(formValue){
    this.form.controls['questionOptions.concept'].setValue(formValue.concept)
  }

}
