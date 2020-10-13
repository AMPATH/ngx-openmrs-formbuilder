import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [AuthenticationService]
})
export class AuthenticationModule {}
