import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  error: any;
  authenticationFlag: boolean = true;
  constructor(public authService: AuthService, private router: Router) {}

  onSubmit(formdata) {
    // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.user));
    if (formdata.valid) {
      this.authService
        .signupWithEmailAndPass(this.user.email, this.user.password)
        .then(res => {
          this.authService.sendToken(this.user.email);
          this.router.navigate(['']);
        })
        .catch(err => {
          this.error = err;
          this.authenticationFlag = false;
        });
    }
  }
  ngOnInit() {}
}
