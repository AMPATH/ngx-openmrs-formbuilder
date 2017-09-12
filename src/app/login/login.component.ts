import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticated:boolean;
  selectedValue:string;
  message:string;

  constructor(private auth:AuthenticationService,private router:Router) { 
    this.setMessage();
  }


  ngOnInit() {
  }

  login(credentials){
    this.auth.setBaseUrl(credentials.baseUrl);
    this.auth.setCredentialsSubject(credentials.username,credentials.password);

    this.message = "Logging in...";
    this.auth.authenticate(credentials.username,credentials.password,credentials.baseUrl).subscribe(res => {
      this.setMessage();
      if(this.auth.isLoggedIn){
        this.authenticated = true;
        this.message = "Success!"
        let redirectUrl = this.auth.redirectUrl ? this.auth.redirectUrl : '/forms';
        this.router.navigate([redirectUrl]);
      }
      else{
        this.message = undefined;
        this.authenticated = false;
      }
    })
  }

  setMessage(){
    let str = (this.authenticated) ?  'in' : undefined;
    if(str)
    this.message = "Already Logged " + str;
  }
}
