import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';
import { LocalStorageService } from 'ngx-localstorage';

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
  isLoading = false;
  loginForm: any;
  loginText = "Login";

  constructor(
    private router: Router,
    private store: Store,
    private notif: ToastrService,
    private apiservice: NTVoyagerApiWtp,
    private lss: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  handleLoginSubmit() {
    var userName = this.loginForm.get('username').value;
    var password = this.loginForm.get('password').value;
    this.loginText = 'Validating...please wait'
    this.isLoading = true;
    this.apiservice.login({userName: userName, password: password} as any).subscribe(
      (res) => {
        this.isLoading = false;
        this.loginText = 'Login'
        if(res.isSuccess === true){
          this.notif.success(res.message, "Success!")
          this.router.navigateByUrl('/dashboard');
          this.lss.set('isAuth', true)
        } else {
          this.notif.error(res.message, "Error!", { positionClass: 'toast-top-center'})
        }
      }
    )
  }
}
