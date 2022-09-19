import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor( private datePipe: DatePipe) { }

  
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

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      accountnumber:'',
      balance:'',
      firstName: '',
      lastName:'',
      email: '',
        address:'',
      gender: 'M',
    });
  }


  insertAccount(account) {
    this.accountList.push({
    accountnumber: account.account_number,
    balance:account.balance,
      firstName: account.firstname,
      lastName: account.lastname,
      email: account.email,
      ddress: account.address,
      gender: account.gender,
      
    });
  }

  updateAccount(account) {
    this.accountList.update(account.$key,
      {
        accountnumber: account.account_number,
    balance:account.balance,
      firstName: account.firstname,
      lastName: account.lastname,
      
      email: account.email,
    
      address: account.address,
      gender: account.gender,
      });
  }

}