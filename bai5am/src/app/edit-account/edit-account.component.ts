import { DataSource } from "@angular/cdk/collections";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../_models/account";

@Component({ 
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',

})


export class EditAccountComponent  {
  dataSource = new MatTableDataSource<User>;
  constructor(
    public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) { }

  ngOnInit() {
    
      console.log('Dialog',this.data)
    }
  
  
  closeDialog() {
    this.dialogRef.close();
  }


}
  