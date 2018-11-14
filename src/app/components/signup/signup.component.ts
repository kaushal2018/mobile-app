import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  user = {
    email: '',
    password: ''
  };
  constructor() {}

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user));
  }
  ngOnInit() {}
}
