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
        if(res.isSuccess === true){
          // get watchlists from db
          this.apiservice.v2().subscribe(
            (res: any) => {
              // set watchlists
              this.lss.set('watchlists', res);
              // set selectedWatchlist
              this.lss.set('watchlist', res[0]);
              // get wlInstruments from db
              this.apiservice.instrumentsAll(res[0].id).subscribe(
                (res1) => {
                  // set wlInstruments by selected watchlist
                  this.lss.set('instruments', res1);
                  // get indices instruments from db
                  this.apiservice.indexInstruments().subscribe(
                    (res2) => {
                      // set indices instruments
                      this.lss.set('indexInstruments', res2);
                      // notification success
                      this.notif.success(res.message, "Success!")
                      // set isAuth true
                      this.lss.set('isAuth', true);
                      //  go dashboard
                      this.router.navigateByUrl('/dashboard');
                      // login flow finished
                      this.isLoading = false;
                      this.loginText = 'Login'
                    },
                    (err) => {
                      this.notif.error("Can not get indices Instruments Data!", "Error!")
                    }
                  )
                },
                (err) => {
                  this.notif.error("Can not get wlInstruments Data!", "Error!")
                }
              )
            },
            (err) => {
              this.notif.error("Can not get Watchlists Data!", "Error!")
            }
          )
        } else {
          this.notif.error(res.message, "Error!", { positionClass: 'toast-top-center'})
        }
      }
    )
  }
}
