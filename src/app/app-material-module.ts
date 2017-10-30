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
  MdTooltipModule,
  MdProgressBarModule
} from '@angular/material';

@NgModule({
  exports: [MdSidenavModule, MdTabsModule, MdIconModule,  MdButtonModule, MdToolbarModule, MdCardModule, MdSnackBarModule,MdMenuModule,MdTooltipModule,MdProgressBarModule]
})
export class AppMaterialModule {}
