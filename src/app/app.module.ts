import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { FormEditorModule } from './form-editor/form-editor/form-editor.module';
import {AuthenticationModule} from './authentication/authentication.module';
import { TypeaheadModule } from 'ngx-bootstrap';
import {AppMaterialModule} from './app-material-module';
import 'hammerjs';
import { AppComponent } from './app.component';
import { ConfirmComponent } from './modals/confirm.component';
import { AlertComponent } from './modals/alert.component';
import {  InsertReferenceComponent }  from './modals//insert-reference-form-modal/insert-reference-forms.modal';
import { SchemaModalComponent  } from './modals/schema-editor.modal';
import { PromptComponent } from './modals/prompt.component';
import { AnswersComponent } from './modals/answers-modal/answers.modal';
import { ConceptsModalComponent } from './modals/concept.modal';
import { ReferenceModalComponent } from './modals/reference-form-modal/reference-form.modal';
import { NavigatorModalComponent } from './modals/navigator.modal';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { LoginComponent } from './login/login.component';
import { SnackbarComponent } from './form-editor/snackbar/snackbar.component';
import { SaveFormsComponent } from './modals/save-form-modal/save-form-modal';

import {AuthGuardService} from './Services/auth-guard.service';
import { SaveFormService } from './Services/save-form.service';
import {  EncounterTypeService } from './Services/encounter-type.service';
import { FormListService } from './Services/form-list.service';
import { SearchFormFilterPipe } from './pipes/search-form-filter.pipe';
import { SetMembersModalComponent } from './modals/set-members-modal/set-members-modal.component';
import { BuildVersionFooterComponent } from './build-version-footer/build-version-footer.component'; 
import { SaveSnackbarComponent } from './form-editor/snackbar/saved-snackbar';
import { FormBuilderComponent } from './app-entry-point/form-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    AlertComponent,
    PromptComponent,
    AnswersComponent,
    SaveFormsComponent,
    ConceptsModalComponent,
    ReferenceModalComponent,
    NavigatorModalComponent,
    ViewFormsComponent,
    InsertReferenceComponent,
    SchemaModalComponent,
    LoginComponent,
    SearchFormFilterPipe,
    SetMembersModalComponent,
    SnackbarComponent,
    BuildVersionFooterComponent, 
    SaveSnackbarComponent, 
    FormBuilderComponent, 
    
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
    TypeaheadModule.forRoot(),
    AppMaterialModule
  ],
  entryComponents: [ConfirmComponent,
     AlertComponent,
     PromptComponent,
     AnswersComponent,
     ConceptsModalComponent,
     ReferenceModalComponent, 
     NavigatorModalComponent,
     InsertReferenceComponent,
     SchemaModalComponent,
     SetMembersModalComponent,
     SnackbarComponent,
     SaveFormsComponent,
    SaveSnackbarComponent],

  providers:[AuthGuardService,EncounterTypeService,FormListService,SaveFormService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
