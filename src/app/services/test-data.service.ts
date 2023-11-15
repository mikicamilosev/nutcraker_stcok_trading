import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../reducers/auth/auth.action';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  constructor(private store: Store, private router: Router) {}

  isAuth(username: string, password: string) {
    var userInfo = {
      username: username,
      password: password,
      status: 200,
      error: ""
    }
    if (username == 'admin' && password == 'admin') {
      return userInfo;
    } else {
      userInfo.status = 400;
      userInfo.error = "Invaild Username or Password!"
      return userInfo
    }
  }

  logout(){
    return true;
  }
}
