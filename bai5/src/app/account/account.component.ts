
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/account';
import { AccountService } from './account.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import {DecimalPipe} from '@angular/common';


@Component({
  selector: 'account-table',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent {
  users$ : Observable<User[]>;
  total$ : Observable<number>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor (public service: AccountService){
    this.users$ = service.users$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent){
    this.headers.forEach(header => {
      if (header.sortable !== column){
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
  




