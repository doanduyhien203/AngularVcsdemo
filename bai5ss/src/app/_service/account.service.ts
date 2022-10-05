import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { USERS } from '../account/accounts';
import { User } from '../_models/account';



@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor( private http:HttpClient) {}

  accountList: any;
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    accountnumber: new FormControl('', Validators.required),
    balance: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    address: new FormControl(''),
    gender: new FormControl(''),
  });
  
  findAccount(
    courseId:number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<User[]> {

    return this.http.get('/api/lessons', {
        params: new HttpParams()
            .set('courseId', courseId.toString())
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
    }).pipe(
        map(res =>  res["payload"])
    );
    }
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      accountnumber: '',
      balance: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      gender: 'M',
    });
  }

  insertAccount(account) {
    this.accountList.push({
      accountnumber: account.account_number,
      balance: account.balance,
      firstName: account.firstname,
      lastName: account.lastname,
      email: account.email,
      ddress: account.address,
      gender: account.gender,
    });
  }
  getAccount() {
    return USERS;
  }
  updateAccount(account) {
    this.accountList.update(account.$key, {
      accountnumber: account.account_number,
      balance: account.balance,
      firstName: account.firstname,
      lastName: account.lastname,

      email: account.email,

      address: account.address,
      gender: account.gender,
    });
  }
  addAccount(formData: User) {
    USERS.push(formData);
  }
  
  
}
