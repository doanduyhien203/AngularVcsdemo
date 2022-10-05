import {
    Component,
    Inject,
    OnInit,
    ViewChild,
  } from '@angular/core';
  import { User } from '../_models/account';
  import { MatTable, MatTableDataSource } from '@angular/material/table';
  import { USERS } from './accounts';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { SelectionModel } from '@angular/cdk/collections';
  import {DataSource} from "@angular/cdk/collections";
  import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
    MAT_DIALOG_DATA,
  } from '@angular/material/dialog';
  import { MatMenuTrigger } from '@angular/material/menu';
  
  import { AccountService } from '../_service/account.service';
  import { FormControl, FormGroup } from '@angular/forms';
  import { SuccessDialogComponent } from '../noti-dialog/success-dialog/success-dialog.component';
  import { WarnDialogComponent } from '../noti-dialog/warn-dialog/warn-dialog.component';
import { AccountDataSource } from './account-data-source';
  
  @Component({
    selector: 'account-table',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
  })
  export class AccountComponent implements OnInit  {
   
    dataSource: AccountDataSource;
    displayedColumns: string[] = [
      'select',
      'account_number',
      'balance',
      'firstname',
      'email',
      'gender',
      'age',
      'address',
      'action',
    ];
    columnsToDisplay = this.displayedColumns.slice();
    data = Object.assign(USERS);
   
    selection = new SelectionModel<User>(true, []);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
    @ViewChild(MatTable) table: MatTable<User>;
    
    constructor(
      public dialog: MatDialog,
      private datadialogRef: MatDialogRef<DataDialog>,
      private accountService: AccountService
    ) {}

    ngAfterViewInit() {
     
    }
    ngOnInit() {
      this.dataSource = new AccountDataSource(this.accountService);
      this.dataSource.loadAccount(1,"",'asc',0,25);
    }
    
    Paginator(){
      this.paginator.page.subscribe(()=>
      this.data
      .getAccount('', '', this.paginator.pageIndex)
      .subscribe(() => {
      
        
      })
      )
    }
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    getPage(){
     
      this.data.subscribe((data: any)=>{
        console.log(data);
        
      })
    }
    
    
  }
  
  @Component({
    selector: 'data-dialog',
    templateUrl: './data-dialog.html',
    styleUrls: ['./data-dialog.css'],
  })
  export class DataDialog implements OnInit {
    dataSource = new MatTableDataSource<User>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<DataDialog>,
      @Inject(MAT_DIALOG_DATA) public data: User,
      private dataService: AccountService
    ) {}
  
    onYesClick(): void {
      this.dialogRef.close(false);
    }
    ngOnInit() {}
    onSubmit(formData) {
      let id = this.dataService.getAccount().length + 1;
      formData.id = id;
      this.dataService.addAccount(formData);
      this.dialogRef.close(false);
    }
    successclick() {
      const dialogRef = this.dialog.open(SuccessDialogComponent, {});
    }
  }
  
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.css'],
  })
  export class EditDialog {
    constructor(
      public dialog: MatDialog,
  
      public dialogRef: MatDialogRef<EditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: User
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    successclick() {
      const dialogRef = this.dialog.open(SuccessDialogComponent, {});
    }
  }
  