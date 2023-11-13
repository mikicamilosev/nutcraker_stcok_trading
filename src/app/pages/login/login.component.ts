import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAuth = false;

  constructor(private router: Router){
    this.isAuth = localStorage.getItem("isAuth") == "true" ? true : false;
  }

  ngOnInit() {
    
  }

  handlelogin(){
    localStorage.setItem('isAuth', "true");
    this.router.navigateByUrl('/dashboard')
  }
}
