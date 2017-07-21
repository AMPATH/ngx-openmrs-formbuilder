import {NgModule} from '@angular/core';
import {MdSidenavModule, MdButtonModule,MdIconModule,MdToolbarModule,MdListModule} from '@angular/material';

@NgModule({
    exports:[MdSidenavModule,MdIconModule,MdButtonModule,MdToolbarModule,MdListModule]
})
export class AppMaterialModule{}