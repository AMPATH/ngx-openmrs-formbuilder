import {
  NgModule
} from '@angular/core';
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatSnackBarModule,
  MatMenuModule,
  MatTabsModule,
  MatTooltipModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  exports: [MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule, MatCardModule, MatSnackBarModule, MatMenuModule, MatTooltipModule, MatProgressBarModule]
})
export class AppMaterialModule {}
