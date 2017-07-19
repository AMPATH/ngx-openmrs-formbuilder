import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdSidenavModule, MdButtonModule,MdIconModule,MdToolbarModule,MdListModule} from '@angular/material';

@NgModule({
    imports:[CommonModule],
    exports:[MdSidenavModule,MdIconModule,MdButtonModule,MdToolbarModule,MdListModule]
})
export class AppMaterialModule{}