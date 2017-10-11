import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import {AceEditorComponent} from 'ng2-ace-editor';
import {NavigatorService} from '../../Services/navigator.service';
import {MdSnackBar} from '@angular/material';
import { FormSchemaCompiler } from '../../Services/schema-compiler.service';
import {FetchFormDetailService} from '../../Services/fetch-form-detail.service';
import  * as _ from "lodash";
import 'brace/index';
import 'brace/mode/json';
import 'brace/theme/chrome';
import 'brace/theme/cobalt';
import 'brace/ext/searchbox';


@Component({
  selector: 'app-schema-editor',
  templateUrl: './schema-editor.component.html',
  styleUrls: ['./schema-editor.component.css'],
  providers:[FormSchemaCompiler]
})


export class SchemaEditorComponent implements OnInit,OnDestroy {

   @ViewChild('editor') editor;
   private _schema:string;
   private _selectedSchemaObj:any;
   private _rawSchema:string;
   private _fullRawSchema:string;
   private _formSchema:any; //full form schema
   pageIndex:number;
   sectionIndex:number;
   questionIndex:number;
   referencedForms:any[];
   badge:string="Compiled";
   viewingUncompiled:boolean=false;
   tooltip:string="View Raw";
   errorMessage:string;
 
   @Input()
   set schema(newSchema:string){
      this._schema = newSchema;
      this.viewingUncompiled = true;
      this.editor.viewingCompiled = false;
      this.tooltip="View Compiled";
      this.badge="Raw";
   }

   @Input()
   set rawSchema(schema){
    this._rawSchema = schema;
    this.editor.setText(this._rawSchema);
    this.editor.getEditor().scrollToLine(0);
   }
 
   @Input()
   set selectedRawSchema(schema){
      
   }
  

   @Input()
   set selectedSchema(newSchema:any){
     this._selectedSchemaObj = newSchema;
     if(this._selectedSchemaObj.pages) this._formSchema = this._selectedSchemaObj
     if(this._selectedSchemaObj.hasOwnProperty('selectedSchema')) {
       
       this.pageIndex = this._selectedSchemaObj['pageIndex'];
       this.sectionIndex = this._selectedSchemaObj['sectionIndex'];
       this.questionIndex = this._selectedSchemaObj['questionIndex'];
     }
   }

   @Input() set $formSchema(schema:any){
     this._formSchema = schema;
   }
  constructor(private ns:NavigatorService,public snackbar:MdSnackBar,private fsc:FormSchemaCompiler,private fs:FetchFormDetailService) {
    	


   }

  ngOnInit() {
   
    
    this.fs.getReferencedFormsArray().subscribe(refFormArray => this.referencedForms=refFormArray)

    this.editor.getEditor().setOptions({
            printMargin:false
        });
          this.editor.setTheme('chrome');
          this.editor.setMode('json');
          this.editor.getEditor().setFontSize(16);

    this.ns.getRawSchema().subscribe(schema =>{
      this._rawSchema = JSON.stringify(schema,null,"\t");
      this.editor.setText(this._rawSchema);
      this.editor.getEditor().scrollToLine(0);
      this.editor.setTheme('chrome');
    });

    setTimeout(() =>{
      let editedSchema=JSON.parse(this.editor.getEditor().getValue());
      if(!_.isEqual(editedSchema,this._rawSchema)) this.render();
    },1000*180); //save schema every 3 minutes
           
  }

  //render button
  render(){
    let editedSchema=this.editor.getEditor().getValue();
    let rawSchema = _.cloneDeep(editedSchema);
    let compiledSchema;
    try{
          compiledSchema=this.fsc.compileFormSchema(JSON.parse(editedSchema),this.referencedForms)
        }
    catch(e){
      compiledSchema = e;
      this.errorMessage = "Invalid JSON schema. " + e;
    }
    
    let schema = JSON.parse(JSON.stringify(compiledSchema));
    if(!_.isEmpty(schema)){
      this.errorMessage = undefined;
      this.ns.setSchema(compiledSchema);
      this.ns.setRawSchema(JSON.parse(rawSchema));
    }
  }



  showSnackbar(){
      this.snackbar.open("Copied to clipboard","",{duration:1200});
  }

  ngOnDestroy(){
    
  }

  toggleEditor(){

   this.viewingUncompiled==false ? this.viewingUncompiled=true : this.viewingUncompiled=false;
   if(this.viewingUncompiled) {
     this.setRawTheme();
     this.editor.setText(this._rawSchema);
     this.editor.getEditor().scrollToLine(0);
   }
   else {
     this.setCompiledTheme();
     this.editor.setText(this._schema);
     this.editor.getEditor().scrollToLine(0);
    }
    
  }

  setRawTheme(){
    this.badge="Raw";
    this.editor.setTheme('chrome');
    this.tooltip="View Compiled";
    this.editor.getEditor().setOptions({readOnly:false});
  }

  setCompiledTheme(){
    this.badge="Compiled";
    this.editor.setTheme('cobalt');
    this.editor.getEditor().setOptions({readOnly:true});
    this.tooltip="View Raw";
    
  }

  viewFullSchema(){
    let schema = JSON.parse(this._schema);
    let line = this.findCurrentLineNumbers(this.editor.getEditor(),schema.label);
    this.editor.getEditor().scrollToLine(line[0]);
    this._schema=JSON.stringify(this._formSchema,null,"\t");
    this.ns.getRawSchema().subscribe(rawSchema => {
      this._rawSchema = JSON.stringify(rawSchema,null,"\t");
      this.editor.getEditor().setOptions({readOnly:true});
    });

    if(this.viewingUncompiled){this.setRawTheme();  this.editor.setText(this._rawSchema); this.editor.getEditor().scrollToLine(0);}
    else{this.setCompiledTheme(); this.editor.setText(this._schema); this.editor.getEditor().scrollToLine(0);
    }
    
  }


 findCurrentLineNumbers(editor, foo) {
    var lines = editor.session.doc.getAllLines();
    var fooLineNumbers=[];
    for (var i = 0;i < lines.length; i++) {
        if (lines[i].indexOf(foo) != -1){
          fooLineNumbers.push(i);
          console.log(lines[i],foo,fooLineNumbers);
        }
        
    }
    
    return fooLineNumbers;
}

}
