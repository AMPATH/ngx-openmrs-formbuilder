import {Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
@Component({
    selector: 'snackbar',
    template: `<div class="text-center">
    <span style="color:green"><i class="fa fa-check-circle fa-2x"></i></span> 
    <h5 style="color:white"> {{data}}</h5>
    </div>`
})
export class SnackbarComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}