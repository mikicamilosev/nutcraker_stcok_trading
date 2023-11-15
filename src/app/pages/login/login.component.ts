import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers/auth/auth.action';
import { TestDataService } from 'src/app/services/test-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token = '';
  error = '';
  isLoading = false;
  loginForm: any;
  val_username_req = true;
  val_password_req = true;
  inputValue1 = '1';
  inputValue2 = '1';

  constructor(
    private router: Router,
    private store: Store,
    private testObj: TestDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async handleLoginSubmit() {
    var userInfo = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? '',
    };

    // this.store.dispatch(fromAuth.login({ username: userInfo.username, password: userInfo.password }));
    try {
      const res = await this.testObj.isAuth(userInfo.username, userInfo.password);
      if (res && res.status == 200) {
        this.store.dispatch(fromAuth.loginSuccess({username: res.username, password: res.password}))
        this.toastr.success('Success!', res.error);
        this.router.navigateByUrl('/dashboard')
      } else {
        this.toastr.error('Warning!', res.error);
        this.loginForm.value.username = "";
        this.loginForm.value.password = ""
      }
    } catch (error) {
    }
  }

  inputusername() {
    if (this.loginForm.value.username !== '') {
      this.val_username_req = false;
    } else {
      this.val_username_req = true;
    }
  }

  inputpassword() {
    if (this.loginForm.value.password !== '') {
      this.val_password_req = false;
    } else {
      this.val_password_req = true;
    }
  }
}
