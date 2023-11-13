import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  sessionActive = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkSession();
  }

  checkSession() {
    console.log(this.router.url)
    this.sessionActive = true;
  }
}
