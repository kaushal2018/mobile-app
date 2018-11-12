import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  state: string = '';
  error: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  hide = true;
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

  loginEmail(formData) {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      this.authService
        .loginWithEmail(
          this.emailFormControl.value,
          this.passwordFormControl.value
        )
        .then(success => {
          this.authService.sendToken(this.emailFormControl.value);
          this.router.navigate(['']);
        })
        .catch(err => {
          this.error = err;
        });
    }
  }

  ngOnInit() {}
}
