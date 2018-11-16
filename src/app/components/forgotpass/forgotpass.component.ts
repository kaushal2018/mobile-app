import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.afAuth.authState.subscribe(auth => {
      if (auth != null) {
        this.router.navigate(['']);
      }
    });
  }
}
