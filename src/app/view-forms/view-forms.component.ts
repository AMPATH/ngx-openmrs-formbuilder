import { Component, OnInit } from '@angular/core';
import { FetchAllFormsService } from '../Services/fetch-all-forms.service';
import { FetchFormDetailService } from '../Services/fetch-form-detail.service'
import { AuthenticationService } from '../Services/authentication.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { Router } from '@angular/router';
import { Constants } from '../Services/constants';
import { FormListService } from '../Services/form-list.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.css']
})
export class ViewFormsComponent implements OnInit {

  forms:Array<any>=[];
  componentForms:any;
  POCForms:any[];
  page: number = 1; //pagination
  loggingOut:boolean=false;
  searchValue:string="";
  loadingMessage:string="Loading Forms...";
  restoreMessage:string="";
  draftAvailable:boolean=false;
  draft:any;
  rawDraft:any;
  formsWithoutSchemas:any[] = [];

  constructor(private fetchAllFormsService:FetchAllFormsService,private router:Router,
    private fetchFormDetailService:FetchFormDetailService,private auth:AuthenticationService,private ls:LocalStorageService,
  private formListService:FormListService) { }

 
  ngOnInit(){

	  this.fetchAllFormsService.fetchAllPOCForms().subscribe(forms =>{
    let f = forms.results;
    f.forEach((form,index) =>{
      this.fetchFormDetailService.fetchFormMetadata(form.uuid,false).then(res =>{
         if(!form.resources[0]||form.resources.length==0) {this.formsWithoutSchemas.push(form.name);}
      });
    });
    this.POCForms = f;
    this.forms = f;
    if(this.forms.length==0) this.loadingMessage ="No forms to display"
    });


    this.fetchAllFormsService.fetchAllComponentForms().subscribe(forms =>{
      this.componentForms = forms.results;
    })

  if(this.ls.getObject(Constants.RAW_SCHEMA)&&this.ls.getObject(Constants.SCHEMA)){
    this.draftAvailable = true;
    let schema = this.ls.getObject(Constants.RAW_SCHEMA);
    let timestamp;
    if(this.ls.getObject(Constants.TIME_STAMP)) timestamp = this.ls.getObject(Constants.TIME_STAMP);
    this.restoreMessage=`Form ${schema.name} was last worked on at ${new Date(parseInt(timestamp))}. Would you like to continue working on this?`;
  }
    
  }



  editForm(uuid:string){
    this.router.navigate(['/edit',uuid]);
  }

  createNew(){
    this.router.navigate(['/edit','new'])
  }

  logout(){
    this.loggingOut = true;
      this.auth.logOut().catch(e => this.router.navigate(['/login']))
      .subscribe(res => {
        this.router.navigate(['/login']);
      });
    
    
  
  }

  discard(){
    this.draftAvailable = false;
    this.ls.remove(Constants.SCHEMA);
    this.ls.remove(Constants.RAW_SCHEMA);
    this.ls.remove(Constants.FORM_METADATA);

  }

  restore(){
    this.draft = this.ls.getObject(Constants.SCHEMA);
    this.router.navigate(['/edit','restoredForm']);
  }

  onChange($event){
    if($event=='Component Forms'){
      this.forms = this.componentForms;
    }

    else{
      this.forms = this.POCForms;
    }
  }

  
}
