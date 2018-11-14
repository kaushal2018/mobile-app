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
    // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
    if (formdata.valid) {
      this.authService
        .loginWithEmail(this.model.email, this.model.password)
        .then(success => {
          this.authService.sendToken(this.model.email);
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
