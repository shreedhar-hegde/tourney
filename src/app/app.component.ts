import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: string = '';
  loggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const userRes = localStorage.getItem('user')!;
    this.user = JSON.parse(userRes);
    if (this.user) {
      this.authService.loggedIn$.next(this.user);
    } else {
      this.router.navigateByUrl('');
    }
  }

  title = 'tourney';
}
