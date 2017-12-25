import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormEditorComponent } from './form-editor/form-editor/form-editor.component';
import { ViewFormsComponent } from './view-forms/view-forms.component';
import { LoginComponent } from './login/login.component';
import { SaveFormsGuardService } from './Services/route-guards/save-forms-guard.service';
import {AuthGuardService} from './Services/route-guards/auth-guard.service';
import {UpdateFormsComponent} from './form-editor/update-forms/update-forms.component';
import {UpdateFormsWizardComponent } from './form-editor/update-forms-wizard/update-forms-wizard.component';
import { TestComponent } from './test/test.component';
const appRoutes: Routes = [
  {path: '', redirectTo: 'forms', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forms', component: ViewFormsComponent, canActivate: [AuthGuardService]},
  {path: 'edit/:uuid', component: FormEditorComponent, canDeactivate: [SaveFormsGuardService]},
  {path: 'update/:oldUuid/:newUuid', component: UpdateFormsComponent, canActivate: [AuthGuardService]},
  {path: 'test', component: TestComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [SaveFormsGuardService]
})
export class AppRoutingModule { }
