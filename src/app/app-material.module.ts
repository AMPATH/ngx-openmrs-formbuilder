import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MdSidenavModule, MdButtonModule,MdIconModule,MdToolbarModule,MdListModule} from '@angular/material';

@NgModule({
    imports:[MdSidenavModule],
    exports:[MdSidenavModule,MdIconModule,MdButtonModule,MdToolbarModule,MdListModule]
})
export class AppMaterialModule{}