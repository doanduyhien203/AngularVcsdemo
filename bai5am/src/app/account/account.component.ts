
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/account';
import { AccountService } from '../_service/account.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import {DecimalPipe} from '@angular/common';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { USERS } from './accounts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { EditAccountComponent } from '../edit-account/edit-account.component';




@Component({
  selector: 'account-table',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent {
  displayedColumns: string[] = ['select','account_number', 'balance', 'firstname', 'email', 'gender', 'age', 'address', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data = Object.assign(USERS);
  dataSource = new MatTableDataSource<User>(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
 
  clickedRows = new Set<User>();
  selection = new SelectionModel<User>(true, []);
constructor( private dialog: MatDialog){
  
  }
  openDialog() {
    console.log('Row clicked');
    const dialog = this.dialog.open(EditAccountComponent, {
      width: '250px',
      // Can be closed only by clicking the close button
      disableClose: true,
    });
  }

 


  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
 
  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index,1)
      this.dataSource = new MatTableDataSource<User>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<User>(true, []);
  this.table.renderRows();

  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  removeAt(index: number) {
    const deleteItem = confirm("Are you sure you want to delete ?" );
    if (deleteItem) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
    }
  }

  

  ngAfterViewInit() {
    

      this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }
  
/** Builds and returns a new User. */

}







