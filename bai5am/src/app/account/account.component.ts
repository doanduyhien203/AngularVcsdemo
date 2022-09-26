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
import { MatPaginator } from '@angular/material/paginator';
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
  columnsToDisplay = this.displayedColumns.slice();
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
      width: '325px',
      
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
    const deleteItem = confirm('Are you sure you want to delete ?');
    if (deleteItem) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    const deleteItems = confirm('Are you sure you want to delete ?');
    if (deleteItems) {
      this.selection.selected.forEach((item) => {
        let index: number = this.data.findIndex((d) => d === item);
        console.log(this.data.findIndex((d) => d === item));
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.selection = new SelectionModel<User>(true, []);
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.account_number + 1}`;
  }
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

  

  genderList: string[] = ['M','F'];
  filterValues1 = {
    gender: [],}
    filterForm = new FormGroup({
      gender: new FormControl(),
     
    });
    get gender() { return this.filterForm.get('gender'); }
    formSubscribe() {
      this.gender.valueChanges.subscribe(positionValue => {
          this.filterValues1['gender'] = positionValue
          this.dataSource.filter = JSON.stringify(this.filterValues1);
      });
     
     
    }
    getFormsValue() {
      this.dataSource.filterPredicate = (data, filter1: string): boolean => {
        let searchString = JSON.parse(filter1);
        let isPositionAvailable = false;
        if (searchString.gender.length) {
          for (const d of searchString.gender) {
            if (data.gender.trim() === d) {
              isPositionAvailable = true;
            }
          }
        } else {
          isPositionAvailable = true;
        }
        const resultValue = isPositionAvailable 
          ;
          
        return resultValue;
        
      }
     
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
  successclick(){
    const dialogRef = this.dialog.open(SuccessDialog, {
      width: '250px', 
      height:'300px'  ,               
  })
  }
}

@Component({
  selector:'success-dialog',
  templateUrl: '../dialog/dialog.component.html',
})
export class SuccessDialog{
  constructor(
    public dialogRef: MatDialogRef<SuccessDialog>,
  ){}

  }

