import {NgModule} from '@angular/core';
import {MdSidenavModule, MdButtonModule,MdIconModule,MdToolbarModule} from '@angular/material';

@NgModule({
    exports:[MdSidenavModule,MdIconModule,MdButtonModule,MdToolbarModule]
})
export class AppMaterialModule{}