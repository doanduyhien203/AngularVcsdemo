import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/account';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { USERS } from './accounts';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { AccountService } from '../_service/account.service';

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
  
  constructor(public dialog: MatDialog,
    private datadialogRef: MatDialogRef<DataDialog>) {}
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
  
  addData() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dataRef = this.dialog.open(DataDialog, dialogConfig);
    dataRef.afterClosed().subscribe(result => {
      this.dataSource.paginator = this.paginator;
    
    })
  }

    onNoClick(): void {
      this.datadialogRef.close();
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
    const data = this.dataSource.data.slice(index,index+1);
    for( let i=0;i<data.length;i++){
      console.log(data[i])
    }
    console.log(data)
    const dialog = this.dialog.open(EditAccountComponent, {
      width: '250px',
      // Can be closed only by clicking the close button
      disableClose: true,
      data: data,
    });
  }


}

@Component({
  selector: 'data-dialog',
  templateUrl: './data-dialog.html',
})
export class DataDialog implements OnInit {
    dataSource = new MatTableDataSource<User>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialogRef: MatDialogRef<DataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dataService: AccountService) { }

  onYesClick(): void {
    this.dialogRef.close(false);
  }
  ngOnInit() {
   
  }
  onSubmit(formData){
    let id = this.dataService.getAccount().length + 1;
    formData.id = id;
    this.dataService.addAccount(formData);
    this.dialogRef.close(false);
  }
}


