import { Component, OnInit } from '@angular/core';
import { FetchAllFormsService } from '../Services/fetch-all-forms.service';
import { FetchFormDetailService } from '../Services/fetch-form-detail.service'
import { AuthenticationService } from '../Services/authentication.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { Router } from '@angular/router';
import { Constants } from '../Services/constants';
import { FormListService } from '../Services/form-list.service';
import { Subscription } from 'rxjs'
import * as _ from 'lodash';
@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.css']
})
export class ViewFormsComponent implements OnInit {

  forms:Array<any>=[];
  componentForms:any;
  POCForms:any[]=[];
  page: number = 1; //pagination
  loggingOut:boolean=false;
  searchValue:string="";
  loadingMessage:string="Loading Forms...";
  restoreMessage:string="";
  draftAvailable:boolean=false;
  draft:any;
  rawDraft:any;
  formsWithoutSchemas:any[] = [];
  subscription:Subscription;

  constructor(private fetchAllFormsService:FetchAllFormsService,private router:Router,
    private fetchFormDetailService:FetchFormDetailService,private auth:AuthenticationService,private ls:LocalStorageService,
  private formListService:FormListService) { }

 
  ngOnInit(){
    
    this.subscription = this.fetchAllFormsService.resaveAllPOCSchemasToLocalStorage.subscribe((res) => {
      if(res){
        this.fetchAllFormSchemas(this.POCForms)
      }
    })
	  this.subscription = this.fetchAllFormsService.fetchAllPOCForms().subscribe(forms =>{
    let f = forms.results;
    
    f.forEach((form,index) =>{
      this.fetchFormDetailService.fetchFormMetadata(form.uuid,false).then(res =>{
         if(!form.resources[0]||form.resources.length==0) {this.formsWithoutSchemas.push(form.name);}
         else this.POCForms.push(form);
      });
    });
    this.POCForms = _.cloneDeep(f);
    this.forms = _.cloneDeep(f);

    
    this.fetchAllFormSchemas(this.POCForms);
    
    if(this.forms.length==0) this.loadingMessage ="No forms to display";
    });

    

  
    this.subscription = this.fetchAllFormsService.fetchAllComponentForms().subscribe(forms =>{
      this.componentForms = forms.results;
    });



  if(this.ls.getObject(Constants.RAW_SCHEMA)&&this.ls.getObject(Constants.SCHEMA)){
    this.draftAvailable = true;
    let schema = this.ls.getObject(Constants.RAW_SCHEMA);
    let timestamp;
    if(this.ls.getObject(Constants.TIME_STAMP)) timestamp = this.ls.getObject(Constants.TIME_STAMP);
    this.restoreMessage=`Form ${this.ls.getObject(Constants.FORM_METADATA).name} was last worked on at ${new Date(parseInt(timestamp))}. Would you like to continue working on this?`;
  }
  
    
  }



  editForm(form:any,uuid:string){
    if(_.includes(this.componentForms,form)) {
      console.log("tis but a component form");
      this.fetchAllFormsService.setFormType(Constants.COMPONENT);
    }
    else {
      console.log("tis but a poc form");
      this.fetchAllFormsService.setFormType(Constants.POC);
    }
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

  fetchAllFormSchemas(POCForms){
    let date = new Date().getTime();
    let count = 0;
    let schemas = [];
    let numberOfPOCForms = POCForms.length;
    let $forms = _.cloneDeep(POCForms);
    if(this.ls.getObject("POC_FORM_SCHEMAS")){ this.ls.setObject("POC_FORM_SCHEMAS",[]);}
    _.forEach(($forms),(formMetadata:any,index:number,form) =>{
          if(formMetadata.resources.length>0&&formMetadata.resources[0].valueReference)
          this.fetchFormDetailService.fetchForm(formMetadata.resources[0].valueReference,true).then((schema) => {
          count = index;
          schemas.push({schema:schema,metadata:formMetadata});
          if(count == numberOfPOCForms-1) {
            //this.fetchAllFormsService.setAllPOCFormSchemas(schemas);
            this.ls.setObject("POC_FORM_SCHEMAS",schemas);
            this.fetchAllFormsService.setPOCFormSchemas(schemas);
            let finishTime = (new Date().getTime() - date)/1000;
            console.log("Done fetching schemas. Took " + finishTime + "seconds");
          }
          });

        });
        
     
   
  }

  
}
