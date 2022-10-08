import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '../_models/account';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { USERS } from './accounts';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
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

@Component({
  selector: 'account-table',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements AfterViewInit {
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
  columnsToDisplay: string[] = [
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

  data = Object.assign(USERS);
  dataSource = new MatTableDataSource<User>(this.data);
  selection = new SelectionModel<User>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatTable) table: MatTable<User>;
  
  constructor(
    public dialog: MatDialog,
    private datadialogRef: MatDialogRef<DataDialog>
  ) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
  }
  ngOnInit() {
    this.formSubscribe();
    this.getFormsValue();
  
  }
  columns = new FormControl();

  addColumn(colNameTemp: []) {
    this.columnsToDisplay = [];
    console.log('col..', JSON.stringify(colNameTemp));
    for (var i = 0; i < colNameTemp.length; i++) {
      this.columnsToDisplay.push(colNameTemp[i]);
    }
  }
  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  copyData() {
    return JSON.stringify(this.data);
  }

  refreshTable() {
    this.columnsToDisplay = this.displayedColumns;
  }
  Paginator(){
    this.paginator.page.subscribe(()=>
    this.data
    .getAccount('', '', this.paginator.pageIndex)
    .subscribe(() => {
      this.dataSource = new MatTableDataSource(
        
      );
      
    })
    )
  }
 
  length = this.dataSource.data.length;
  pageSize = 25;
  pageSizeOptions: number[] = [10, 25, 100];

  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
   
  }
  addData() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dataRef = this.dialog.open(DataDialog, dialogConfig);
    dataRef.afterClosed().subscribe((result) => {
      this.dataSource.paginator = this.paginator;
    });
  }

  user;
  editUser(user) {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '350px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = user;
    });
  }
  onNoClick(): void {
    this.datadialogRef.close();
  }

  removeAt(index: number) {
    const dialogRef = this.dialog.open(WarnDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        const data = this.dataSource.data;
        data.splice(
          this.paginator.pageIndex * this.paginator.pageSize + index,
          1
        );
        this.dataSource.data = data;
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  removeSelectedRows() {
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(WarnDialogComponent, {});
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.selection.selected.forEach((item) => {
            let index: number = this.data.findIndex((d) => d === item);
            console.log(this.data.findIndex((d) => d === item));
            this.dataSource.data.splice(index, 1);
            this.dataSource = new MatTableDataSource<User>(
              this.dataSource.data
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          this.selection = new SelectionModel<User>(true, []);
        }
      });
    }
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.account_number + 1
    }`;
  }
/*
  filterText = '';

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterText = filterValue.trim();
    this.dataSource.filter = this.filterText.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
*/
  genderList: string[] = ['M', 'F'];
  filterValues = {
    gender: [],
    firstname: '',
    
  };
  filterForm = new FormGroup({
    gender: new FormControl(),
    firstname: new FormControl(),
   
  });
  get gender() {
    return this.filterForm.get('gender');
  }
  get firstname() {
    return this.filterForm.get('firstname');
  }
  
  searchTerm;
  
  formSubscribe() {
    this.gender.valueChanges.subscribe((genderValue) => {
      this.filterValues['gender'] = genderValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.firstname.valueChanges.subscribe((firstnameValue) => {
      this.filterValues['firstname'] = firstnameValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    
  }
  updateSearch(e) {
    this.searchTerm = e.target.value;
  }
  searchString;
  getFormsValue() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      
      let isGenderAvailable = false;
      if (searchString.gender.length) {
        for (const d of searchString.gender) {
          if (data.gender.trim() === d) {
            isGenderAvailable = true;
          }
        }
      } else {
        isGenderAvailable = true;
      }
      const resultValue =
        isGenderAvailable &&
        (
          data.firstname
          .toString()
          .trim()
          .toLowerCase()
          .includes(searchString.firstname) ||
          data.lastname
            .toString()
            .trim()
            .toLowerCase()
            .includes(searchString.firstname) ||
          data.address
            .toString()
            .trim()
            .toLowerCase()
            .includes(searchString.firstname)
        )
        
      return resultValue;
    };

      this.dataSource.filter = JSON.stringify(this.filterValues);
  }
}

@Component({
  selector: 'data-dialog',
  templateUrl: './add-data-dialog.html',
  styleUrls: ['./add-data-dialog.css'],
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
  length=this.dataService.getAccount().length +1;
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
  templateUrl: './edit-dialog.html',
  styleUrls: ['./edit-dialog.css'],
})
export class EditDialog {
  constructor(
    public dialog: MatDialog,
    private dataService: AccountService,
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