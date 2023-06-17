import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  loggedIn!: boolean;

  ngOnInit(): void {
    console.log('header', this.loggedIn);
    this.authService.loggedIn$.subscribe((user: any) => {
      console.log('header', user);
      if (user.token) {
        console.log(user);
        this.loggedIn = true;
      }
    });
  }

  onSignUpClick = () => {
    this.router.navigateByUrl('/signup');
  };

  onLoginClick = () => {
    this.router.navigateByUrl('/login');
  };

  onLogoutClick = () => {
    localStorage.clear();
    this.loggedIn = false;
    this.authService.loggedIn$.next({});
    this.router.navigateByUrl('/');
  };
}
