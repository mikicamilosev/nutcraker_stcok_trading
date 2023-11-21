import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as fromAuthSelector from '../../../reducers/auth/auth.selectors';
import * as fromAuth from '../../../reducers/auth/auth.action'
import { LocalStorageService } from 'ngx-localstorage';
import { NTVoyagerApiWtp } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAuth: any;

  constructor(
    private router: Router,
    private store: Store,
    private lss: LocalStorageService,
    private apiService: NTVoyagerApiWtp
  ) {
    this.isAuth = this.lss.get('isAuth')
  }

  async getUsername() {}

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      const currentUrl = event.url;
      var isAuth = this.lss.get('isAuth');
      if(currentUrl === '/dashboard' && isAuth === true){
        this.isAuth = isAuth;
      } else {
        this.router.navigateByUrl('/login')
      }
    });
  }
  
  ngOnChanges() {
    console.log('isAuth is false')
  }

  logout() {
    try {
      this.isAuth = false;
      this.lss.set('isAuth', false);
    } catch (error) {
      
    }
  }

  gotopage(str: string) {}
}
