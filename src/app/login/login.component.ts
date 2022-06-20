import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../Services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {
    this.setMessage();
  }

  authenticated: boolean;
  hasConnectionProblem = false;
  hasInvalidCredentials = false;
  selectedValue: string;
  message: string;
  selectedBaseUrl = '';
  baseUrls: string[] = [
    'Enter a custom URL',
    'https://ngx.ampath.or.ke/amrs',
    'https://data.kenyahmis.org:8500/openmrs',
    'https://dev3.openmrs.org/openmrs'
  ];

  ngOnInit() {}

  login(credentials) {
    if (credentials.customServerUrl) {
      credentials.baseUrl = credentials.customServerUrl;
    }

    this.authenticated = false;
    this.auth.setBaseUrl(credentials.baseUrl);
    this.auth.setCredentialsSubject(credentials.username, credentials.password);
    this.auth
      .authenticate(
        credentials.username,
        credentials.password,
        credentials.baseUrl
      )
      .pipe(
        catchError((error) => {
          if (error.status === 0) {
            this.hasConnectionProblem = true;
          }
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res.sessionId && !res.authenticated) {
          this.hasInvalidCredentials = true;
        }
        this.setMessage();
        if (this.auth.isLoggedIn) {
          this.authenticated = true;
          this.message = 'Success!';
          const redirectUrl = this.auth.redirectUrl
            ? this.auth.redirectUrl
            : '/forms';
          this.router.navigate([redirectUrl]);
        } else {
          this.message = undefined;
          this.authenticated = false;
        }
      });
  }

  setMessage() {
    const str = this.authenticated ? 'in' : undefined;
    if (str) {
      this.message = 'Already Logged ' + str;
    }
  }
}
