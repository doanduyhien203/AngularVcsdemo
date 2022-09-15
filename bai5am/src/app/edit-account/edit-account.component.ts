import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-account',
  templateUrl: '../edit-account/edit-account.component.html',

})


export class EditAccountComponent {
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
  