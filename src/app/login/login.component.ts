import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin = (event: any) => {
    event.preventDefault();

    this.authService
      .login('shreea@gmail.com', 'testpassword')
      .subscribe((res: any) => {
        this.authService.loggedIn$.next(res);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigateByUrl('profile');
      });
  };
}
