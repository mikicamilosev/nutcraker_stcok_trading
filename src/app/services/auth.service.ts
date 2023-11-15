import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private router: Router){}

  // login(username: string, password: string): Observable<void> {
  isAuth(username: string, password: string): Observable<string> {
    // Add your authentication logic and API call here
    // For simplicity, this example returns an observable without any API call
    var token = 'failedToken';
    console.log("username", username)
    console.log("password", password)
    if (username == 'admin' && password == 'admin') {
      token = "successToken";
    }
    return of(token);
  }

  logout(): void {
    // Add your logout logic here
  }
}
