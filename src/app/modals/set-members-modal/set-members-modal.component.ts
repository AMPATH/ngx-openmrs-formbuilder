import { Component, Input,OnInit,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup, FormBuilder, FormControl } from "@angular/forms"
export interface SetMembersModel {
  setMembers:any[];
}

interface Questions{
  label:string;
  concept:string;
  answers:Answers[];

}

interface Answers{
  label:string;
  concept:string;
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

  constructor(dialogService: DialogService,private fb:FormBuilder,private cdRef:ChangeDetectorRef) {
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

    if(event.target.checked){
      let answer:Answers={
        label: this.setMembers[i].answers[j].display,
        concept: this.setMembers[i].answers[j].uuid
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
