import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'snackbar',
  template: `<div class="text-center">
    <span style="color:green"><i class="fa fa-check-circle fa-2x"></i></span>
    <h5 style="color:white">Schema Saved Succesfully!</h5>
  </div>`
})
export class SaveSnackbarComponent {}
