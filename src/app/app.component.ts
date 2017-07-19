import { Component, OnInit } from '@angular/core';
import { FetchFormsService } from './Services/fetch-forms.service'
import { NavigatorService } from './Services/navigator.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   schema:any ="";
   selectedSchema:any ="";
   strSchema:string="";
  constructor(private fs: FetchFormsService, private ns: NavigatorService){
    
  }

  ngOnInit(){
    
      this.fs.fetchAvailableForms().subscribe(
          res => this.schema = res
      )
        
      this.ns.getSelectedElement().subscribe(
          res => {
              this.selectedSchema = res;
              this.strSchema = JSON.stringify(this.selectedSchema,null,'\t');
              console.log(this.strSchema)
          }
      )
  }


  setSchemaEditor(event){
      console.log(event);
  }

}

