import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from '../Services/authentication.service';
import {LocalStorageService} from '../Services/local-storage.service';
import {SessionStorageService} from '../Services/session-storage.service';
import {SessionService} from '../Services/session.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    AuthenticationService,
    LocalStorageService,
    SessionService,
    SessionStorageService,
    
  ]
})
export class AuthenticationModule { }
