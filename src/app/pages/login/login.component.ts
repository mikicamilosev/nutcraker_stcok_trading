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
                (res1: any) => {
                  var subWlsList: any = [];
                  var instruments: any = []
                  res1.forEach((ele: any) => {
                    console.log(ele)
                    subWlsList.push(ele.pesk);
                    instruments.push(this.instrument(ele.pesk, ele.symbol, ele.name));
                  })
                  // set wlInstruments by selected watchlist
                  this.lss.set('instruments', instruments);
                  // get watchlists for subscription
                  this.lss.set('subWlList', subWlsList);
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
          this.isLoading = false
          this.loginText = "Login";
        }
      }
    )
  }

  instrument(pesk: string, symbol: string, name: string) {
    var res = {
      pesk: pesk,
      symbol: symbol,
      name: name,
      BS1: '0',
      BP1: '0',
      AP1: '0',
      AS1: '0',
      // BS2: '0',
      // B2: '0',
      // A2: '0',
      // AS2: '0',
      // BS3: '0',
      // B3: '0',
      // A3: '0',
      // AS3: '0',
      LTP: '0',
      LTS: '0',
      LTT: '00:00:00',
      CHG: '0',
      CHGP: '0',
      CLS: '0',
      L: '0',
      H: '0',
      chgColour: 'warning',
    };
    return res;
  }
}
