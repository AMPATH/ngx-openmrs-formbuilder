import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material-module';
import {FormEntryModule} from 'ng2-openmrs-formentry';
import {AceEditorModule} from 'ng2-ace-editor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import 'hammerjs';
import { FetchFormsService } from './Services/fetch-forms.service';
import {NavigatorService} from './Services/navigator.service';
import {QuestionControlService} from './Services/question-control.service';
import {PropertyFactory} from './form-editor/models/property-factory';
import {FormElementFactory} from './form-editor/form-elements/form-element-factory';
import {QuestionIdService} from './Services/question-id.service';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './form-editor/navigator/navigator.component';
import { SchemaEditorComponent } from './form-editor/schema-editor/schema-editor.component';
import { ElementEditorComponent } from './form-editor/element-editor/element-editor.component';
import { FormRendererComponent } from './form-editor/form-renderer/form-renderer.component';
import {DynamicQuestionComponent} from './form-editor/element-editor/dynamic-question/dynamic-question.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    SchemaEditorComponent,
    ElementEditorComponent,
    FormRendererComponent,
    DynamicQuestionComponent
    
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormEntryModule,
    NoopAnimationsModule,
    HttpModule,
    AceEditorModule,
    
    
  ],
  providers: [FetchFormsService,
              NavigatorService,
              QuestionControlService,
              PropertyFactory,
              FormElementFactory,
              QuestionIdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
