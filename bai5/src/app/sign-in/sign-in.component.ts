import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  usernamePattern= /^(?=.*[a-z]+)[a-z0-9]{6,32}$/i;
  passwordPattern = /^(?=.*[A-Z!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
  User = {
    userName: '',
    password: '',
    rememberMe: false,
  }
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    console.log(form);
  }
}
