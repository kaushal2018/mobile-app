import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  loginGoogle() {
    this.authService.loginWithGoogle().then(data => {
      this.authService.sendToken(data.user.email);
      this.router.navigate(['']);
    });
  }

  loginFacebook() {
    this.authService.loginWithFacebook().then(data => {
      this.authService.sendToken(data.user.email);
      this.router.navigate(['']);
    });
  }

  loginTwitter() {
    this.authService.loginWithTwitter().then(data => {
      this.authService.sendToken(data.user.email);
      this.router.navigate(['']);
    });
  }

  ngOnInit() {}
}
