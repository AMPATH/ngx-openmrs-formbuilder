import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {AceEditorComponent} from 'ng2-ace-editor';
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
   private _schema;
 
   @Input()
   set schema(newSchema:string){
      this._schema = newSchema;
      this.editor.setText(this._schema);
      this.editor.getEditor().scrollToLine(0);
   }

  constructor() { }

  ngOnInit() {

    this.editor.getEditor().setOptions({
            printMargin:false
        });
          this.editor.setTheme('chrome');
          this.editor.setMode('json');
          this.editor.getEditor().setFontSize(16);
          
  }

  //render button
  onRender(schema){
    
  }

}
