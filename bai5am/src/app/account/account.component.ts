import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { User } from '../_models/account';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { USERS } from './accounts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';

import { MatMenuTrigger } from '@angular/material/menu';
import { EditAccountComponent } from '../edit-account/edit-account.component';

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
  constructor(public dialog: MatDialog) {}
  /*
   addData() {
    const randomElementIndex = Math.floor(Math.random() * this.data.length);
    this.dataSource.data.push();
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.data.pop();
    this.table.renderRows();
  }
  */
  newRecord = '';
  newObject = {
    firstName: '',
    lastName: '',
  };
  data1: any[] = [];
  names: any[] = [];
  addData() {
    this.data1.push(this.newRecord);
    this.newRecord = '';
    if (this.newObject.firstName && this.newObject.lastName) {
      this.names.push(this.newObject);
    }
    this.newObject = {
      firstName: '',
      lastName: '',
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  addColumn() {
    const randomColumn = Math.floor(
      Math.random() * this.displayedColumns.length
    );
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
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
  openDialog(index: number) {
    const data2 = this.dataSource.data.slice(index,index+1);
    console.log('Row clicked', data2.slice(0));
    

    const dialog = this.dialog.open(EditAccountComponent, {
      width: '250px',
      // Can be closed only by clicking the close button
      disableClose: true,
      data: data2.slice(0),
    });
  }
}
