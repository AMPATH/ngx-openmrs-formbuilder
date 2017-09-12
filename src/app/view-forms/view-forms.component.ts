import { Component, OnInit } from '@angular/core';
import {FetchAllFormsService} from '../Services/fetch-all-forms.service';
import {FetchFormDetailService} from '../Services/fetch-form-detail.service'
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.css']
})
export class ViewFormsComponent implements OnInit {

  forms:Array<any> = [];
  page: number = 1; //pagination
  loggingOut:boolean=false;



  constructor(private fetchAllFormsService:FetchAllFormsService,private router:Router,
    private fetchFormDetailService:FetchFormDetailService,private auth:AuthenticationService) { }

 
  ngOnInit(){
	  this.fetchAllFormsService.fetchAllPOCForms().subscribe(forms =>{
    let f = forms.results;
    f.forEach((form,index) =>{
      this.fetchFormDetailService.fetchFormMetadata(form.uuid).then(res =>{
        if(!form.resources[0]) {f.splice(index,1)}
      })
    })
    this.forms = f;
    })

  
  }

  editForm(uuid:string){
    
    this.router.navigate(['/edit',uuid]);
  }

  createNew(){
    this.router.navigate(['/edit','new'])
  }

  logout(){
    this.loggingOut = true;
    this.auth.logOut().subscribe(res => {
      console.log(res);
      this.router.navigate(['/login']);
    });
    
  }
}
