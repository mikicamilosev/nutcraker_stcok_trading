import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store'
import { AppState } from '../../../store';
import { getSomeData } from '../../../reducers/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  sessionActive: Boolean;
  someData$: Observable<any>;

  constructor(private router: Router, private store: Store) {
    const storedSession = localStorage.getItem('isAuth');
    this.sessionActive = storedSession == "true" ? true : false;
    this.someData$ = this.store.pipe(select(getSomeData));
  }

  async getUsername() {
    const res = await this.store.pipe(select(getSomeData));
    console.log(res)
    return res;
  }

  ngOnChanges(){
    
  }

  ngOnInit() {
    const storedSession = localStorage.getItem('isAuth');
    console.log(storedSession)
    this.sessionActive = storedSession == "true" ? true : false;
    console.log(window.location.pathname)
  }

  logout(){
    this.sessionActive = false;
    localStorage.setItem('isAuth', "false");
    this.router.navigateByUrl('/login')
  }

  gotopage(str: string){
    const isAuth = localStorage.getItem('isAuth') == "true" ? true: false;
    return str;
  }
}
