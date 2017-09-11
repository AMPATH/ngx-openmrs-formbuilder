import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { FormEditorComponent } from '../form-editor/form-editor.component';
import {ConfirmComponent} from '../modals/confirm.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class SaveFormsGuardService implements CanDeactivate<FormEditorComponent>{

  constructor(private router:Router) { }

  canDeactivate(component: FormEditorComponent,route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean|Observable<boolean>|Promise<boolean>{
   
    let can = component.canDeactivate();
    console.log('DeactivateGuard#canDeactivate called, can: ', can);
    if (!can) {
      this.router.navigate([this.router.url]);
      return false;
    }

    return true;
  }
}
