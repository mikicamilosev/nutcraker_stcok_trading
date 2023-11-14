import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { login } from 'src/app/reducers/auth/auth.actions';
import { AppState } from '../../store';
import { getSomeData } from '../../reducers/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  val_username_req = true;
  val_password_req = true;
  inputValue1= "1";
  inputValue2= "1";

  constructor(private router: Router, private store: Store){
  }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
    
  }

  handleLoginSubmit(){
    var userInfo = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? ''
    }

    if(userInfo.username == "admin" && userInfo.password == "admin"){
      this.store.dispatch(login({ username: userInfo.username, password: userInfo.password }));
      this.router.navigateByUrl('/dashboard')
    }
  }

  inputusername(){
    if(this.loginForm.value.username !== ""){
      this.val_username_req = false;
    } else {
      this.val_username_req = true;
    }
  }


  inputpassword(){
    if(this.loginForm.value.password !== ""){
      this.val_password_req = false;
    } else {
      this.val_password_req = true;
    }
  }
}
