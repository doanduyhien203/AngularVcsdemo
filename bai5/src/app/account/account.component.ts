
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import UserJson from './accounts.json';


export interface USERS {
  account_number: number;
  balance: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  address: string;
  employer: string;
  email: string;
  city: string;
  state: string;


}

@Component({
  selector: 'app-root',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent {
  Users: USERS[] = UserJson;
  
  sortedData: USERS[];
  constructor(){
    this.sortedData = this.Users.slice();
  }
  sortData(sort: Sort) {
    const data = this.Users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'account_number':
          return compare(a.account_number, b.account_number, isAsc);
        case 'balance':
          return compare(a.balance, b.balance, isAsc);
        case 'age':
          return compare(a.age, b.age, isAsc);
        case 'genders':
          return compare(a.gender, b.gender, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}





