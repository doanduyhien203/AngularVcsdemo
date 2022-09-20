import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginService } from '../_service/userlogin.service';
import { AlertService } from '../_service/alert.service';

const PASSWORD_PATTERN = /^[a-z0-9!@#$%^&*]{4,32}$/;
const EMAIL_PATTERN = /^(?=.*[.@]+)[a-z0-9!@#$%^&*.]{4,50}$/;


const validateMatchedControlsValue = (
  firstControlName: string,
  secondControlName: string
) => {
  return function (formGroup: FormGroup): ValidationErrors | null {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as AbstractControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as AbstractControl;
    return firstControlValue === secondControlValue
      ? null
      : {
          valueNotMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
};

@Component({
  selector: 'app-regis-user',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  showPassword1: boolean = false;
  showPassword: boolean = false;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
  
    private route: ActivatedRoute,
    private router: Router,
    private loginService: UserLoginService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    
  }
  registerForm = this.fb.group(
    {
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a0-z9]{4,32}$/i),
        ]),
        
      ],
      email: [
        '',
        Validators.compose([
          Validators.email,
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(EMAIL_PATTERN),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
    },
    {
      validators: validateMatchedControlsValue('password', 'confirmPassword'),
    }
  );
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    /*    this.formSubmit$
      .pipe(
        tap(() => this.registerForm.markAsDirty()),
        switchMap(() =>
          this.registerForm.statusChanges.pipe(
            startWith(this.registerForm.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => {
          this.submitForm();
        })
      )
      .subscribe();
      */
  }
  // submitForm(): void {}
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return ;
    }

    this.loading = true;
    this.loginService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  public togglePasswordVisibility1(): void {
    this.showPassword1 = !this.showPassword1;
  }
}
