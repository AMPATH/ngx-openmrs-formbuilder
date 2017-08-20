import {
  NgModule
} from '@angular/core';
import {
  MdSidenavModule,
  MdButtonModule,
  MdIconModule,
  MdToolbarModule,
  MdCardModule,
  MdSnackBarModule,
  MdMenuModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  exports: [MdSidenavModule, MdIconModule,  MdButtonModule, MdToolbarModule, MdCardModule, MdSnackBarModule,MdMenuModule,MdTooltipModule]
})
export class AppMaterialModule {}
