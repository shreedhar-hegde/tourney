import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSignUp = (event: any) => {
    event.preventDefault();
    console.log('calling signup');

    this.authService
      .signup('testuser', 'shreea@gmail.com', 'testpassword')
      .subscribe((res) => {
        console.log('res', res);
      });
  };
}
