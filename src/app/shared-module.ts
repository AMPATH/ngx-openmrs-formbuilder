import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from '../app/form-editor/navigator/navigator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material-module';
import { AceEditorModule } from 'ng2-ace-editor';
import { ClipboardModule } from 'ngx-clipboard';
import { TypeaheadModule } from 'ngx-bootstrap';
import { LocalStorageService } from './Services/storage/local-storage.service';
import { SessionStorageService } from './Services/storage/session-storage.service';
import { SessionService } from './Services/storage/session.service';
import { FormEntryModule } from '@ampath-kenya/ngx-openmrs-formentry';
@NgModule({
  declarations: [NavigatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    AceEditorModule,
    ClipboardModule,
    TypeaheadModule.forRoot(),
    FormEntryModule
  ],
  exports: [
    NavigatorComponent,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    AceEditorModule,
    ClipboardModule,
    TypeaheadModule,
    FormEntryModule
  ],
  providers: [LocalStorageService, SessionStorageService, SessionService]
})
export class SharedModule {}
