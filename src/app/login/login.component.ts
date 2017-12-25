import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticated: boolean;
  selectedValue: string;
  message: string;
  baseUrls: string[]= ['https://test2.ampath.or.ke:8443/amrs', 'https://ngx.ampath.or.ke/amrs'];
  constructor(private auth: AuthenticationService,private router: Router) {
    this.setMessage();
  }


  ngOnInit() {
  }

  login(credentials) {
    this.auth.setBaseUrl(credentials.baseUrl);
    this.auth.setCredentialsSubject(credentials.username, credentials.password);

    this.message = 'Logging in...';
    this.auth.authenticate(credentials.username, credentials.password, credentials.baseUrl).catch((error) => {
      if (error.message.indexOf('You provided an invalid object where a stream was expected.') !== -1) {
      this.message = 'Kindly check your internet connection and make sure CORS is turned on then refresh the page.';
      }
      return error;
    })
    .subscribe((res) => {
      this.setMessage();
      if (this.auth.isLoggedIn) {
        this.authenticated = true;
        this.message = 'Success!';
        const redirectUrl = this.auth.redirectUrl ? this.auth.redirectUrl : '/forms';
        this.router.navigate([redirectUrl]);
      } else {
        this.message = undefined;
        this.authenticated = false;
      }
    });

  }

  setMessage() {
    const str = (this.authenticated) ?  'in' : undefined;
    if (str) {
      this.message = 'Already Logged ' + str;
    }

  }


}
