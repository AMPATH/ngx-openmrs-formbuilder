// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEntryModule } from 'ngx-openmrs-formentry/dist/ngx-formentry';
import { SharedModule } from '../../shared-module';
// Services
import { FetchFormDetailService } from '../../Services/openmrs-api/fetch-form-detail.service';
import { NavigatorService } from '../../Services/navigator.service';
import { QuestionControlService } from '../../Services/question-control.service';
import { PropertyFactory } from '../models/property-factory';
import { FormElementFactory } from '../form-elements/form-element-factory';
import { QuestionIdService } from '../../Services/question-id.service';
import { ConceptService } from '../../Services/openmrs-api/concept.service';
import { FormFactory } from '../form-elements/form-factory.service';
import { FetchAllFormsService } from '../../Services/openmrs-api/fetch-all-forms.service';
import { ElementEditorService } from '../../Services/element-editor.service';
import { FormSchemaCompiler } from '../../Services/schema-compiler.service';
import { UpdateComponentService } from '../../Services/update-component.service';

// Components
import { ReferenceFormsComponent } from '../reference-forms/reference-forms.component';
import { SchemaEditorComponent } from '../schema-editor/schema-editor.component';
import { ElementEditorComponent } from '../element-editor/element-editor.component';
import { FormRendererComponent } from '../form-renderer/form-renderer.component';
import { DynamicQuestionComponent } from '../element-editor/dynamic-question/dynamic-question.component';
import { ConceptComponent } from '../concept/concept.component';
import { FormEditorComponent } from './form-editor.component';
import { AuditInfoComponent } from '../audit-info/audit-info.component';
import { UpdateFormsComponent } from '../update-forms/update-forms.component';
import { OrderComponent } from '../order/order.component';
@NgModule({
  imports: [CommonModule, FormEntryModule, SharedModule],

  declarations: [
    SchemaEditorComponent,
    ElementEditorComponent,
    FormRendererComponent,
    DynamicQuestionComponent,
    ConceptComponent,
    FormEditorComponent,
    ReferenceFormsComponent,
    AuditInfoComponent,
    UpdateFormsComponent,
    OrderComponent
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
    ElementEditorService,
    FormSchemaCompiler,
    UpdateComponentService
  ],

  exports: [FormEntryModule]
})
export class FormEditorModule {}
