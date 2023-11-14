import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
  login(username: string, password: string): Observable<void> {
    // Add your authentication logic and API call here
    // For simplicity, this example returns an observable without any API call
    if(username == "admin" && password == "admin"){
      
    }
    return of();
  }

  logout(): void {
    // Add your logout logic here
  }
}