import { Component, Input,OnInit,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup, FormBuilder, FormControl } from "@angular/forms"
import { ConceptService } from '../../Services/openmrs-api/concept.service';
export interface SetMembersModel {
  setMembers:any[];
}

interface Questions{
  label:string;
  concept:string;
  answers:Answer[];

}

interface Answer{
  label:string;
  concept:string;
  conceptMappings:any[];
}

@Component({
  selector: 'set-members-modal',
  templateUrl: './set-members-modal.component.html',
  styleUrls: ['./set-members-modal.component.css']
})

export class SetMembersModalComponent extends DialogComponent<SetMembersModel, string> implements SetMembersModel,OnInit,AfterViewChecked {
  setMembersModel:any;
  setMembers:any[];
  questionsChecked:Questions[]=[];

  constructor(dialogService: DialogService,
              private fb:FormBuilder,
              private cs: ConceptService,
              private cdRef:ChangeDetectorRef) {
    super(dialogService);
  }
  

  ngOnInit(){
  
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  save() {
    this.result = JSON.stringify(this.questionsChecked);
    this.questionsChecked = [];
    this.close();
  }

  setQuestions(event,i){

    if(event.target.checked){
      let question:Questions={
        label: this.setMembers[i].display,
        concept: this.setMembers[i].uuid,
        answers:[]
      }
      this.questionsChecked.push(question);
    }

    else{
      this.questionsChecked.forEach((question,index) =>{
        if(question.concept==this.setMembers[i].uuid){
          this.questionsChecked.splice(index,1);
          return;
        }
      })
    }

  }


  setAnswers(event,i,j){
    let $ans = this.setMembers[i].answers[j];
    if(event.target.checked){
      let answer:Answer={
        label: $ans.display,
        concept: $ans.uuid,
        conceptMappings: this.cs.createMappingsValue($ans.mappings)
      }

   
      this.questionsChecked.forEach((question,index)=>{

        if(question.concept==this.setMembers[i].uuid&&question.answers.indexOf(answer)==-1)
               {this.questionsChecked[index]['answers'].push(answer);
                return;
              }
      });
      
    }


    else{
      this.questionsChecked.forEach((question,qIndex)=>{
       question.answers.forEach((answer,aIndex) =>{
         if(answer.concept==this.setMembers[i].answers[j].uuid)
          {
            this.questionsChecked[qIndex].answers.splice(aIndex,1);
            return;
            }
       })
      });
      
      
    }
  }


  isQuestionChecked(index){
    let isChecked:boolean = false;
    this.questionsChecked.forEach((question) =>{
      if(this.setMembers[index].display==question.label){
        isChecked = true;
      }
    });
      return isChecked;
  }

  

}
