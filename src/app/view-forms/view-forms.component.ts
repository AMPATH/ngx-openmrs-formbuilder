import { Component, OnInit } from '@angular/core';
import { FetchAllFormsService } from '../Services/fetch-all-forms.service';
import { FetchFormDetailService } from '../Services/fetch-form-detail.service'
import { AuthenticationService } from '../Services/authentication.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { Router } from '@angular/router';
import { Constants } from '../Services/constants';

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

  constructor(private fetchAllFormsService:FetchAllFormsService,private router:Router,
    private fetchFormDetailService:FetchFormDetailService,private auth:AuthenticationService,private ls:LocalStorageService) { }

 
  ngOnInit(){

	  this.fetchAllFormsService.fetchAllPOCForms().subscribe(forms =>{
    let f = forms.results;
    f.forEach((form,index) =>{
      this.fetchFormDetailService.fetchFormMetadata(form.uuid).then(res =>{
        if(!form.resources[0]) {f.splice(index,1)}
      })
    });
    this.POCForms = f;
    this.forms = f;
    if(this.forms.length==0) this.loadingMessage ="No forms to display"
    });


    this.fetchAllFormsService.fetchAllComponentForms().subscribe(forms =>{
      this.componentForms = forms.results;
    })

  if(this.ls.storageLength==2){
    this.draftAvailable = true;
    this.restoreMessage="There is an unsaved form! Would you like to continue to editing it?";
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
    this.ls.clear();

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
