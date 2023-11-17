import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers/auth/auth.action';
import { TestDataService } from 'src/app/services/test-data.service';
import { ToastrService } from 'ngx-toastr';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

type userInfoProps = {
  userName: string;
  password: string;
}

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
    private toastr: ToastrService,
    private apiservice: NTVoyagerApiWtp
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  handleLoginSubmit() {
    // this.apiservice.login(this.loginForm).subscribe(
    //   (res) => {
    //     console.log(res)
    this.store.dispatch(fromAuth.loginSuccess({username: "admin", password: "admin"}))
        this.router.navigateByUrl('/dashboard');
    //   },
    //   (err) => {
    //     console.log(err)
    //   }
    // )
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
