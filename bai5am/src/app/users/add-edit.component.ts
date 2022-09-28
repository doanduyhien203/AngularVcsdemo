import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { AlertService } from "../_service/alert.service";
import { UserLoginService } from "../_service/userlogin.service";



   
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
@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;

    isAddMode : boolean ;
    loading = false;
    submitted = false;
    confirmPass : string;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: UserLoginService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.confirmPass= this.route.snapshot.params['confirmPassword']
        this.isAddMode = !this.id;
  
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(4)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            username: ['', Validators.required],
           
            oldpass:['',Validators.required],
            password: ['', passwordValidators],
            confirmPass : this.confirmPass,
             
        },
        {validators: validateMatchedControlsValue('oldpass', 'confirmPass')}
          
        );
1
        if (!this.isAddMode) {
            this.loginService.getById(this.id)
                .pipe(first())
                .subscribe(x => {   
                    this.f['email'].setValue(x.email);  
                    this.f['username'].setValue(x.username);
                    this.f['confirmPass'].setValue(x.confirmPassword);
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.loginService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: (_data) => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../login', { relativeTo: this.route }]);
                },
                error: (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                }});
    }

    private updateUser() {
        this.loginService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: (_data) => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    setTimeout(() =>this.router.navigate(['/home'], { relativeTo: this.route }),2000);
                },
                error: (error) => {
                    this.alertService.error(error);
                    this.loading = false;
                }});
    }
    showPassword: boolean = false;
     public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}