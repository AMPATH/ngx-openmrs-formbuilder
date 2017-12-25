import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateFormsWizardModalComponent } from './update-forms-wizard-modal/update-forms-wizard-modal.component';
import { ConfirmComponent } from './confirm.component';
import { AlertComponent } from './alert.component';
import {  InsertReferenceComponent } from './insert-reference-form-modal/insert-reference-forms.modal';
import { SchemaModalComponent  } from './schema-editor.modal';
import { PromptComponent } from './prompt.component';
import { SetMembersModalComponent } from './set-members-modal/set-members-modal.component';
import { AnswersComponent } from './answers-modal/answers.modal';
import { ConceptsModalComponent } from './concept.modal';
import { ReferenceModalComponent } from './reference-form-modal/reference-form.modal';
import { NavigatorModalComponent } from './navigator.modal';
import { SaveFormsComponent } from './save-form-modal/save-form-modal';
import { UpdateFormsWizardComponent } from '../form-editor/update-forms-wizard/update-forms-wizard.component';
import { SharedModule } from '../shared-module';
@NgModule({
    declarations: [
        ConfirmComponent,
        AlertComponent,
        PromptComponent,
        AnswersComponent,
        SaveFormsComponent,
        ConceptsModalComponent,
        ReferenceModalComponent,
        NavigatorModalComponent,
        SetMembersModalComponent,
        UpdateFormsWizardModalComponent,
        UpdateFormsWizardComponent,
        InsertReferenceComponent,
        SchemaModalComponent,
    ],
    entryComponents: [
        ConfirmComponent,
        AlertComponent,
        PromptComponent,
        AnswersComponent,
        SaveFormsComponent,
        ConceptsModalComponent,
        ReferenceModalComponent,
        NavigatorModalComponent,
        SetMembersModalComponent,
        UpdateFormsWizardModalComponent,
        InsertReferenceComponent,
        SchemaModalComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
     ],
    exports: [
        ConfirmComponent,
        AlertComponent,
        PromptComponent,
        AnswersComponent,
        SaveFormsComponent,
        ConceptsModalComponent,
        ReferenceModalComponent,
        NavigatorModalComponent,
        SetMembersModalComponent,
        UpdateFormsWizardModalComponent,
        InsertReferenceComponent,
        SchemaModalComponent,
    ],
    providers: [],
})
export class ModalsModule {

}