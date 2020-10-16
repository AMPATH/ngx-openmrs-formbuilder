import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { FormEditorModule } from './form-editor/form-editor/form-editor.module';
import { AuthenticationModule } from './Services/authentication/authentication.module';
import { AppMaterialModule } from './app-material-module';
import { ModalsModule } from './modals/modals-module';
import { SharedModule } from './shared-module';
import 'hammerjs';
import { AppComponent } from './app.component';
import { NotificationComponent } from './form-editor/snackbar/notification-toast';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { LoginComponent } from './login/login.component';
import { SnackbarComponent } from './form-editor/snackbar/snackbar.component';
import { AuthGuardService } from './Services/route-guards/auth-guard.service';
import { SaveFormService } from './Services/openmrs-api/save-form.service';
import { EncounterTypeService } from './Services/openmrs-api/encounter-type.service';
import { FormListService } from './Services/form-list.service';
import { SearchFormFilterPipe } from './pipes/search-form-filter.pipe';
import { BuildVersionFooterComponent } from './build-version-footer/build-version-footer.component';
import { SaveSnackbarComponent } from './form-editor/snackbar/saved-snackbar';
import { FormBuilderComponent } from './app-entry-point/form-builder.component';
import { Str2Num } from './pipes/string_to_number.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilderHttpInteceptor } from './Services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchFormFilterPipe,
    Str2Num,
    SnackbarComponent,
    BuildVersionFooterComponent,
    SaveSnackbarComponent,
    FormBuilderComponent,
    ViewFormsComponent,
    NotificationComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BootstrapModalModule,
    NgxPaginationModule,
    FormEditorModule,
    AppRoutingModule,
    AuthenticationModule,
    AppMaterialModule,
    ModalsModule,
    SharedModule
  ],

  entryComponents: [
    SaveSnackbarComponent,
    SnackbarComponent,
    NotificationComponent
  ],
  providers: [
    AuthGuardService,
    EncounterTypeService,
    FormListService,
    SaveFormService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FormBuilderHttpInteceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(applicationRef: ApplicationRef) {
    // for ng2-bootstrap-modal in angualar 5
    Object.defineProperty(applicationRef, '_rootComponents', {
      get: () => applicationRef['components']
    });
  }
}
