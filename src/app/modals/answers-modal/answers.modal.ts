import { Component, Input,OnInit,AfterViewChecked,ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import{ FormGroup, FormBuilder, FormControl } from "@angular/forms"
export interface AnswersModel {
  answers:any;
}

@Component({
  selector: 'prompt',
  templateUrl: './answers-modal.html',
    styles:[`
.modal-dialog{
    overflow-y: initial !important
}
.modal-content{
    height: 550px;
    overflow-y: auto;
}
/* Hiding the checkbox, but allowing it to be focused */
.badgebox
{
    opacity: 0;
}

.badgebox + .badge
{
    /* Move the check mark away when unchecked */
    text-indent: -999999px;
    /* Makes the badge's width stay the same checked and unchecked */
	width: 27px;
}

.badgebox:focus + .badge
{
    /* Set something to make the badge looks focused */
    /* This really depends on the application, in my case it was: */
    
    /* Adding a light border */
    box-shadow: inset 0px 0px 5px;
    /* Taking the difference out of the padding */
}

.badgebox:checked + .badge
{
    /* Move the check mark back when checked */
	text-indent: 0;
}`]

})
export class AnswersComponent extends DialogComponent<AnswersModel, string> implements AnswersModel,OnInit,AfterViewChecked {
  answers:any;
  checkboxes={};
  checked:boolean=false;

  constructor(dialogService: DialogService,private fb:FormBuilder,private cdRef:ChangeDetectorRef) {
    super(dialogService);
  }
  

  ngOnInit(){
  
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  save(value) {
    this.result = JSON.stringify(this.checkboxes);
    this.close();
  }

  setCheckboxes(event,i){
    if(event.target.checked){
    this.checkboxes['answer'+i]=event.target.getAttribute('value');
  }
  
  else{
    delete this.checkboxes['answer'+i];
  }
    
   

  }

  selectAll(event){
    if(event.target.checked){
         this.answers.forEach((answer,index) => {
            this.checked = event.target.checked;
            this.checkboxes['answer'+index]=answer.display+","+answer.uuid;
    });
    }
   else{
       this.answers.forEach((answer,index) => {
            this.checked = false;
    });
      this.checkboxes = {};
  }
    
  }
 
}
