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
  MdTabsModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  exports: [MdSidenavModule, MdTabsModule, MdIconModule,  MdButtonModule, MdToolbarModule, MdCardModule, MdSnackBarModule,MdMenuModule,MdTooltipModule]
})
export class AppMaterialModule {}
