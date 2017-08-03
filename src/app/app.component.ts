import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchFormsService } from './Services/fetch-forms.service'
import { NavigatorService } from './Services/navigator.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   schema:any;
   selectedSchema:any;
   strSchema:string;
   questions:any;
   page:any; //to add new question
   section:any; //to add new section
   @ViewChild('sidenav') public myNav;
  constructor(private fs: FetchFormsService, private ns: NavigatorService){
    
  }

  ngOnInit(){
    //onLoad
      this.fs.fetchAvailableForms().subscribe(
          res => {
              this.schema = res;
              this.selectedSchema = res;
              this.strSchema = JSON.stringify(this.schema,null,'\t');
              this.collectUniqueIDs(this.schema)
            }
      )
      //on navigator element clicked for editing
      this.ns.getSelectedElement().subscribe(
          res => {
              this.selectedSchema = res;
              this.strSchema = JSON.stringify(this.selectedSchema['selectedSchema'],null,'\t');
          }
      )

      //on element added/deleted/modified
      this.ns.getSchema().subscribe(
          res => {
              this.schema = res;
              this.strSchema = JSON.stringify(this.schema,null,'\t')
          }

       
      )

       this.ns.getNewQuestion().subscribe(
           res => {
               this.questions = res['schema']
               this.page = this.schema.pages[res['pageIndex']].label
               this.section = this.schema.pages[res['pageIndex']].sections[res['sectionIndex']].label
               this.myNav.close()
           }
       )



  }
i:number=0;
    collectUniqueIDs(schema){
    
        if(schema.pages!=null) {this.collectUniqueIDs(schema.pages)}

        if(Array.isArray(schema)){
            schema.forEach(element => {
                if(element.sections) this.collectUniqueIDs(element.sections)
                if(element.questions) this.collectUniqueIDs(element.questions)
                else {
                if(element.id!=undefined){++this.i;console.log(element.id);}
            }
                })
        }


        
    }

}

