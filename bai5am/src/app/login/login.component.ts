import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: UserLoginService,
        private alertService: AlertService) {
            {
                // redirect to home if already logged in
                if (this.loginService.userValue) {
                    this.router.navigate(['/']);
                }
        }
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        rememberMe: false,
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  /*
  onSubmit(): void {
    console.log(this.signInForm);
  }
  */
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.loginService.login(this.f['username'].value, this.f['password'].value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}
