import { Component } from '@angular/core';
import { User } from '../_models/account';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { AccountService } from '../_service/account.service';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
@Component({
  template: ''
})
export class AccountDataSource implements DataSource<User> {
  private accountSubject = new BehaviorSubject<User[]>([]);
  private loadingAccount = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingAccount.asObservable();

  constructor(private accountService: AccountService) {}
  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.accountSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.accountSubject.complete();
    this.loadingAccount.complete();
  }

  loadAccount(
    accountId: number,
    filter = '',
    sortDirection: 'asc',
    pageIndex = 0,
    pageSize: 25
  ) {
    this.loadingAccount.next(true);

    this.accountService
      .findAccount(accountId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingAccount.next(false))
      )
      .subscribe((account) => this.accountSubject.next(account));
  }
  ngAfterViewInit() {}
  ngOnInit() {}
}
