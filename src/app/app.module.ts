import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';


import { AppComponent } from './app.component';
import { NavigatorComponent } from './form-editor/navigator/navigator.component';

import { FetchFormsService } from './fetch-forms.service';
import { SchemaEditorComponent } from './form-editor/schema-editor/schema-editor.component';
import {AceEditorModule} from 'ng2-ace-editor';
import { ElementEditorComponent } from './form-editor/element-editor/element-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    SchemaEditorComponent,
    ElementEditorComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AceEditorModule,
    AppMaterialModule
  ],
  providers: [FetchFormsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
