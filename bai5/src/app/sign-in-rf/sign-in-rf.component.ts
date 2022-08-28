import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in-rf',
  templateUrl: './sign-in-rf.component.html',
  styleUrls: ['./sign-in-rf.component.css'],
})
export class SignInRfComponent implements OnInit {
  signInForm = this.fb.group({
    username: '',
    password: '',
    rememberMe: false,
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  onSubmit(): void {
    console.log(this.signInForm);
  }
}
