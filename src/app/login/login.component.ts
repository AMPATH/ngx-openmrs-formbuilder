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

  constructor(private auth:AuthenticationService,private router:Router) { }


  ngOnInit() {
  }

  login(credentials){
    this.auth.authenticate(credentials.username,credentials.password,credentials.baseUrl).subscribe(res => {
      
      let result = res.json();
      if(result.authenticated){
        this.router.navigate(['/forms']);
        this.authenticated = true;
      }
      else{
        this.authenticated = false;
      }
    })
  }

}
