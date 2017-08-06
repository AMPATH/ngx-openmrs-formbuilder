import {NgModule} from '@angular/core';
import {MdSidenavModule, MdSelectModule,MdButtonModule,MdIconModule,MdToolbarModule,MdListModule,MdCardModule,MdInputModule,MdSnackBarModule} from '@angular/material';

@NgModule({
    exports:[MdSidenavModule,MdIconModule,MdSelectModule,MdButtonModule,MdToolbarModule,MdListModule,MdCardModule,MdInputModule,MdSnackBarModule]
})
export class AppMaterialModule{}