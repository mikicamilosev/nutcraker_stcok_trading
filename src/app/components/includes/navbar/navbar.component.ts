import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  sessionActive = localStorage.getItem('isAuth') == "true" ? true : false;

  constructor(private router: Router) {
    const storedSession = localStorage.getItem('isAuth');
    console.log(storedSession)
    this.sessionActive = storedSession == "true" ? true : false;
  }

  ngOnInit() {
    const storedSession = localStorage.getItem('isAuth');
    console.log(storedSession)
    this.sessionActive = storedSession == "true" ? true : false;
  }

  logout(){
    this.sessionActive = false;
    localStorage.setItem('isAuth', "false");
    this.router.navigateByUrl('/login')
  }
}
