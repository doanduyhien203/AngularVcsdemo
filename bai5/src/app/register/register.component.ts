import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable, Subject, timer, tap, take, startWith, pipe } from 'rxjs';
import { ApiService } from './api.service';
<<<<<<< HEAD
import { filter, first, switchMap } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';
=======
import { filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../service/alert.service';
import { UserLoginService } from '../service/userlogin.service';

>>>>>>> e2b11c094ebd2a728f1278d2b04c056030571b10
const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
const EMAIL_PATTERN = /^(?=.*[@]+)[a-z0-9!@#$%^&*]{6,32}$/;

const validateUsernameFromApi = (api: ApiService) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return api.validateUsername(control.value).pipe(
      map((isValid: boolean) => {
        return isValid ? null : { usernameDuplicated: true };
      })
    );
  };
};

const validateUsernameFromApiDebounce = (api: ApiService) => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() =>
        api.validateUsername(control.value).pipe(
          map((isValid) => {
            if (isValid) {
              return null;
            }
            return {
              usernameDuplicated: true,
            };
          })
        )
      )
    );
  };
};

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formSubmit$ = new Subject<boolean | null>();
  loading = false;
  submitted = false;
  registerForm = this.fb.group(
    {
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
        validateUsernameFromApiDebounce(this.api),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(EMAIL_PATTERN),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(PASSWORD_PATTERN),
        ]),
      ],
    },
    {
      validators: validateMatchedControlsValue('password', 'confirmPassword'),
    }
  );





  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    
  ) {
   
  }
  
  get f() { return this.registerForm.controls; }
 

  ngOnInit(): void {
    this.formSubmit$
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
          this.submitForm() ;
        })
      )
      .subscribe(

       );
  }
  submitForm() {
    notify({ message: "form submitted" }, "success", 2000);

      );

  }
}
function notify(arg0: { message: string; }, arg1: string, arg2: number) {
  throw new Error('Function not implemented.');
}

