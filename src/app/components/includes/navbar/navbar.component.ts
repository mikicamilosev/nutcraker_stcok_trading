import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromAuthSelector from '../../../reducers/auth/auth.selectors';
import { TestDataService } from 'src/app/services/test-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth = false;

  constructor(
    private router: Router,
    private store: Store,
    private testData: TestDataService,
  ) {
    this.store
      .select(fromAuthSelector.selectIsAuth)
      .subscribe((isAuth) => (this.isAuth = isAuth));
  }

  async getUsername() {}

  ngOnChanges() {
  }
  
  ngOnInit() {
    if (!this.isAuth) {
      this.router.navigateByUrl('/');
    }
  }

  logout() {
    this.testData.logout();
  }

  gotopage(str: string) {}
}
