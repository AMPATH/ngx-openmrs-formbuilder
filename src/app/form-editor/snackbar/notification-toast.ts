import {Component, Inject} from '@angular/core';
import { MD_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  template: '<span><i class="fa fa-spinner fa-spin"></i></span>{{ data }}',
})
export class NotificationComponent {
  constructor(@Inject(MD_SNACK_BAR_DATA) public data: any) { }
}
