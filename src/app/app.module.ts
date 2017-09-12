import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { FormEditorModule } from './form-editor/form-editor/form-editor.module';
import {AuthenticationModule} from './authentication/authentication.module';
import 'hammerjs';


import { AppComponent } from './app.component';
import { ConfirmComponent } from './modals/confirm.component';
import { AlertComponent } from './modals/alert.component';
import {  InsertReferenceComponent }  from './modals/insert-reference-forms.modal';
import { SchemaModalComponent  } from './modals/schema-editor.modal';
import { PromptComponent } from './modals/prompt.component';
import { AnswersComponent } from './modals/answers.modal';
import { ConceptsModalComponent } from './modals/concept.modal';
import { ReferenceModalComponent } from './modals/reference-form.modal';
import { NavigatorModalComponent } from './modals/navigator.modal';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { LoginComponent } from './login/login.component';

import {AuthGuardService} from './Services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    AlertComponent,
    PromptComponent,
    AnswersComponent,
    ConceptsModalComponent,
    ReferenceModalComponent,
    NavigatorModalComponent,
    ViewFormsComponent,
    InsertReferenceComponent,
    SchemaModalComponent,
    LoginComponent 
  ],


  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    BootstrapModalModule,
    NgxPaginationModule,
    FormEditorModule,
    AppRoutingModule,
    AuthenticationModule,
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

  providers:[AuthGuardService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
