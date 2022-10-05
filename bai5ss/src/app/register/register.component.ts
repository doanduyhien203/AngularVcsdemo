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
import { SuccessDialogComponent } from '../noti-dialog/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
const PASSWORD_PATTERN =/^(?=.*[0-9]+)[a-zA-Z0-9!@#$%^&*]{4,32}$/;
//const PASSWORD_PATTERN =/^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]{4,32}$/;
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
      : {  notSame: true,
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
  [x: string]: any;
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
          Validators.pattern(/^[a-zA-Z0-9]{4,32}$/),
        ]),
        
      ],
      email: [
        '',
        Validators.compose([
          Validators.email,
          Validators.required,
          Validators.minLength(4),
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
      .subscribe({
        next: (_data) => {
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });
          setTimeout(() =>this.router.navigate(['..'], { relativeTo: this.route }),1000);
         
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        }}
      );
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  public togglePasswordVisibility1(): void {
    this.showPassword1 = !this.showPassword1;
  }
  
}
