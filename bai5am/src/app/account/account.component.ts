import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/account';
import { MatTableDataSource } from '@angular/material/table';
import { USERS } from './accounts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'account-table',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements AfterViewInit {
  displayedColumns = [
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
  constructor(
    // private dialog: MatDialog,
    ) {
    
    // console.log(this.data);
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

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  
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
 
  
}
  
  


