import { Component, OnInit, ViewChild } from '@angular/core';
import { FetchFormsService } from './Services/fetch-forms.service'
import { NavigatorService } from './Services/navigator.service'
import { QuestionIdService } from './Services/question-id.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   schema:any;
<<<<<<< HEAD
	 selectedSchema:any;
	 rawSelectedSchema:any;
	 strSchema:string;
	 rawSchema:any;
	 questions:any;
	 page:any; //to add new question
   section:any; //to add new section
   question:any;
	 parentQuestion:any;
	 strRawSchema:string;
=======
   selectedSchema:any;
   strSchema:string;
   questions:any;
   page:any; //to add new question
   section:any; //to add new section
   question:any;
   parentQuestion:any;
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
   @ViewChild('sidenav') public myNav;
  constructor(private fs: FetchFormsService, private ns: NavigatorService, private qs:QuestionIdService){
  }

  closeElementEditor(){
	this.questions = undefined;
  }
 
  closeNavigator(event){
	  this.myNav.close();
<<<<<<< HEAD
	}
	
	openNavigator(){
		this.myNav.open();
	}

  ngOnInit(){ 

		this.ns.getRawSchema().subscribe(res => {
			this.rawSchema = res;
			this.strRawSchema = JSON.stringify(this.rawSchema,null,"\t")
		})

		this.ns.getClickedElementRawSchema().subscribe(res => 
			{
				this.rawSelectedSchema = res
				this.strRawSchema = JSON.stringify(this.rawSelectedSchema,null,"\t")
				console.log(this.strRawSchema)
			}
		)

	//onLoad
	  this.fs.fetchForm("adult").subscribe(
		  res => {
				this.schema = res;
				this.selectedSchema = res;
				this.strSchema = JSON.stringify(this.schema,null,'\t');
			}
	  )
	  //on navigator element clicked for editing
	  this.ns.getClickedElementSchema().subscribe(
=======
  }

  ngOnInit(){ 
	//onLoad
	  this.fs.fetchForm("adult.json").subscribe(
		  res => {
			  this.schema = res;
			  this.selectedSchema = res;
			  this.strSchema = JSON.stringify(this.schema,null,'\t');
			}
	  )
	  //on navigator element clicked for editing
	  this.ns.getSelectedElement().subscribe(
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
		  res => {
			  this.selectedSchema = res;
			  this.strSchema = JSON.stringify(this.selectedSchema.selectedSchema,null,'\t');
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
			   this.page = res['pageIndex']
			   this.section = res['sectionIndex']
			   this.question = res['questionIndex'];
			   this.parentQuestion = res['parentQuestionIndex']
			   this.myNav.close()
		   }
<<<<<<< HEAD
		 )
		 

		 

=======
	   )

	   
	  
	   
>>>>>>> d3c973f238b8f5ed1a2c51a345e79d19df3292e3
  }


}

