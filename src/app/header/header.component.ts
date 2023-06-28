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
  username!: string;

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((user: any) => {
      if (user?.token) {
        this.loggedIn = true;
        this.username = user.username;
      } else {
        this.router.navigateByUrl('');
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
