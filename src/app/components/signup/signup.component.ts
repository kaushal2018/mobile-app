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
    if (formdata.valid) {
      this.authService
        .signupWithEmailAndPass(this.user.email, this.user.password)
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
  ngOnInit() {
    this.authService.afAuth.authState.subscribe(auth => {
      if (auth != null) {
        this.router.navigate(['']);
      }
    });
  }
}
