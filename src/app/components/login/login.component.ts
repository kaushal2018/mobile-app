import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  error: any;
  authenticationFlag: boolean = true;
  constructor(public authService: AuthService, private router: Router) {}

  onSubmit(formdata) {
    if (formdata.valid) {
      this.authService
        .loginWithEmail(this.model.email, this.model.password)
        .then(data => {
          this.authService.sendToken(JSON.stringify(data.user));
          this.router.navigate(['']);
        })
        .catch(err => {
          this.error = err;
          this.authenticationFlag = false;
        });
    }
  }

  loginGoogle() {
    this.authService.loginWithGoogle().then(data => {
      this.authService.sendToken(JSON.stringify(data.user));
      this.router.navigate(['']);
    });
  }

  loginFacebook() {
    this.authService.loginWithFacebook().then(data => {
      this.authService.sendToken(JSON.stringify(data.user));
      this.router.navigate(['']);
    });
  }

  loginTwitter() {
    this.authService.loginWithTwitter().then(data => {
      this.authService.sendToken(JSON.stringify(data.user));
      this.router.navigate(['']);
    });
  }

  ngOnInit() {
    this.authService.afAuth.authState.subscribe(auth => {
      if (auth != null) {
        this.router.navigate(['']);
      }
    });
  }
}
