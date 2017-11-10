import { Component, OnInit, Input } from '@angular/core';
import {FetchAllFormsService} from './Services/fetch-all-forms.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  constructor(private fetchAllFormsService:FetchAllFormsService,private router:Router){
    
  }

  
  ngOnInit(){
	 
  }




}

