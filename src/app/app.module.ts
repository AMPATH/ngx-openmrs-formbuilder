import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material-module';
import {FormEntryModule} from 'ng2-openmrs-formentry';
import {AceEditorModule} from 'ng2-ace-editor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';
import { FetchFormDetailService } from './Services/fetch-form-detail.service';
import {NavigatorService} from './Services/navigator.service';
import {QuestionControlService} from './Services/question-control.service';
import {PropertyFactory} from './form-editor/models/property-factory';
import {FormElementFactory} from './form-editor/form-elements/form-element-factory';
import {QuestionIdService} from './Services/question-id.service';
import {ConceptService} from './Services/concept.service';
import {FormFactory} from './form-editor/form-elements/form-factory.service';
import {FetchAllFormsService} from './Services/fetch-all-forms.service';
import {AuthenticationModule} from './authentication/authentication.module';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './form-editor/navigator/navigator.component';
import { SchemaEditorComponent } from './form-editor/schema-editor/schema-editor.component';
import { ElementEditorComponent } from './form-editor/element-editor/element-editor.component';
import { FormRendererComponent } from './form-editor/form-renderer/form-renderer.component';
import {DynamicQuestionComponent} from './form-editor/element-editor/dynamic-question/dynamic-question.component';
import { ConceptComponent } from './form-editor/concept/concept.component';
import { ConfirmComponent } from './modals/confirm.component';
import { AlertComponent } from './modals/alert.component';
import {  InsertReferenceComponent }  from './modals/insert-reference-forms.modal';
import { SchemaModalComponent  } from './modals/schema-editor.modal';
import { PromptComponent } from './modals/prompt.component';
import { AnswersComponent } from './modals/answers.modal';
import { ConceptsModalComponent } from './modals/concept.modal';
import { ReferenceModalComponent } from './modals/reference-form.modal';
import { NavigatorModalComponent } from './modals/navigator.modal';
import { ReferenceFormsComponent } from './form-editor/reference-forms/reference-forms.component';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    SchemaEditorComponent,
    ElementEditorComponent,
    FormRendererComponent,
    DynamicQuestionComponent, 
    ConceptComponent,
    ConfirmComponent,
    AlertComponent,
    PromptComponent,
    AnswersComponent,
    ConceptsModalComponent,
    ReferenceModalComponent,
    NavigatorModalComponent,
    ReferenceFormsComponent,
    FormEditorComponent,
    ViewFormsComponent,
    InsertReferenceComponent,
    SchemaModalComponent,
    LoginComponent 
  ],


  imports: [
    BrowserModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormEntryModule,
    NoopAnimationsModule,
    HttpModule,
    AceEditorModule,
    BootstrapModalModule,
    ClipboardModule,
    NgxPaginationModule,
    AppRoutingModule,
    AuthenticationModule
  ],
  entryComponents: [ConfirmComponent,
     AlertComponent,
     PromptComponent,
     AnswersComponent,
     ConceptsModalComponent,
     ReferenceModalComponent, 
     NavigatorModalComponent,
     InsertReferenceComponent,
     SchemaModalComponent ],

  providers: [FetchFormDetailService,
              NavigatorService,
              QuestionControlService,
              PropertyFactory,
              FormElementFactory,
              QuestionIdService,
              ConceptService,
              FormFactory,
              FetchAllFormsService,
              
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
