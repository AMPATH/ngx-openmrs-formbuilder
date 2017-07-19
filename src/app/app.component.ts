import { Component, OnInit } from '@angular/core';
import { FetchFormsService } from './fetch-forms.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   schema:any ="";
  constructor(private fs: FetchFormsService){
    
  }

  ngOnInit(){
    
      this.fs.fetchAvailableForms().subscribe(
          res => this.schema = res
      )
  }


  setSchemaEditor(event){
      console.log(event);
  }

}

