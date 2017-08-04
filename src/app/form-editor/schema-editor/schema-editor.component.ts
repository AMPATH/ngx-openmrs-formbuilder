import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {AceEditorComponent} from 'ng2-ace-editor';
import {NavigatorService} from '../../Services/navigator.service';
import 'brace/index';
import 'brace/mode/json';
import 'brace/theme/chrome';



@Component({
  selector: 'app-schema-editor',
  templateUrl: './schema-editor.component.html',
  styleUrls: ['./schema-editor.component.css']
})


export class SchemaEditorComponent implements OnInit {

   @ViewChild('editor') editor;
   private _schema:string;
   private _selectedSchemaObj:any;
   formSchema:any; //full form schema
   pageIndex:number;
   sectionIndex:number;
   questionIndex:number;

   @Input()
   set schema(newSchema:string){
      this._schema = newSchema;
      this.editor.setText(this._schema);
      this.editor.getEditor().scrollToLine(0);
   }

   @Input()
   set selectedSchema(newSchema:any){
     this._selectedSchemaObj = newSchema;
     if(this._selectedSchemaObj.pages) this.formSchema = this._selectedSchemaObj
     if(this._selectedSchemaObj.hasOwnProperty('selectedSchema')) {
       
       this.pageIndex = this._selectedSchemaObj['pageIndex'];
       this.sectionIndex = this._selectedSchemaObj['sectionIndex'];
       this.questionIndex = this._selectedSchemaObj['questionIndex'];
      
       
     }
   }

  constructor(private ns:NavigatorService) { }

  ngOnInit() {

    this.editor.getEditor().setOptions({
            printMargin:false
        });
          this.editor.setTheme('chrome');
          this.editor.setMode('json');
          this.editor.getEditor().setFontSize(16);
          
  }

  //render button
  render(){
    let editedSchema=this.editor.getEditor().getValue();
    editedSchema = JSON.parse(editedSchema)
    if(editedSchema.pages){
      this.ns.setSchema(editedSchema)
      return;
    }

    else if(editedSchema.sections){
      this.formSchema.pages[this.pageIndex]= editedSchema
    }

    else if(editedSchema.questions){
      this.formSchema.pages[this.pageIndex].sections[this.sectionIndex] = editedSchema
    }
    else{
      this.formSchema.pages[this.pageIndex].sections[this.sectionIndex].questions[this.questionIndex] = editedSchema
    }
    this.ns.setSchema(this.formSchema)
  }

}
