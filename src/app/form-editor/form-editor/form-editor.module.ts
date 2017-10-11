// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormEntryModule} from 'ng2-openmrs-formentry';
import {AceEditorModule} from 'ng2-ace-editor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import {AppMaterialModule} from '../../app-material-module';

//Services
import { FetchFormDetailService } from '../../Services/fetch-form-detail.service';
import {NavigatorService} from '../../Services/navigator.service';
import {QuestionControlService} from '../../Services/question-control.service';
import {PropertyFactory} from '../models/property-factory';
import {FormElementFactory} from '../form-elements/form-element-factory';
import {QuestionIdService} from '../../Services/question-id.service';
import {ConceptService} from '../../Services/concept.service';
import {FormFactory} from '../form-elements/form-factory.service';
import {FetchAllFormsService} from '../../Services/fetch-all-forms.service';
import {ElementEditorService} from '../../Services/element-editor.service';

//Components
import { ReferenceFormsComponent } from '../reference-forms/reference-forms.component';
import { NavigatorComponent } from '../navigator/navigator.component';
import { SchemaEditorComponent } from '../schema-editor/schema-editor.component';
import { ElementEditorComponent } from '../element-editor/element-editor.component';
import { FormRendererComponent } from '../form-renderer/form-renderer.component';
import {DynamicQuestionComponent} from '../element-editor/dynamic-question/dynamic-question.component';
import { ConceptComponent } from '../concept/concept.component';
import { FormEditorComponent } from './form-editor.component';
import { AuditInfoComponent } from '../audit-info/audit-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormEntryModule,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    AppMaterialModule
  ],

  declarations: [
    NavigatorComponent,
    SchemaEditorComponent,
    ElementEditorComponent,
    FormRendererComponent,
    DynamicQuestionComponent, 
    ConceptComponent,
    FormEditorComponent,
    ReferenceFormsComponent,
    AuditInfoComponent
  ],

  providers: [
    FetchFormDetailService,
    NavigatorService,
    QuestionControlService,
    PropertyFactory,
    FormElementFactory,
    QuestionIdService,
    ConceptService,
    FormFactory,
    FetchAllFormsService,
    ElementEditorService
    
  ],

  exports:[
    FormEntryModule,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    AppMaterialModule,
    NavigatorComponent

  ]
})
export class FormEditorModule { }
