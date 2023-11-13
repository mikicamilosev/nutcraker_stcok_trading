import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}
  progressValue = 0;
  showProgressBar = false;

  toggleProgressBar() {
    this.showProgressBar = !this.showProgressBar;
    if (this.showProgressBar) {
      this.animateProgressBar();
    }
  }

  animateProgressBar() {
    this.router.navigateByUrl('/dashboard');
  }
}
