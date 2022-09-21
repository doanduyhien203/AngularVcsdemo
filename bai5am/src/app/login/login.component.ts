import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from '../_service/alert.service';
import { UserLoginService } from '../_service/userlogin.service';

@Component({
  selector: 'app-sign-in-rf',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public showPassword: boolean = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: UserLoginService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in

    if (this.loginService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false,
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }
  /*
  onSubmit(): void {
    console.log(this.signInForm);
  }
  */
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loginService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        _data => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
