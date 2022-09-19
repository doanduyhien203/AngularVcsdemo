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
<<<<<<< HEAD
    @Inject(MAT_DIALOG_DATA) public data2: any,
=======
    @Inject(MAT_DIALOG_DATA) public data: User,
>>>>>>> f836ac8791a2c79b13f6028288c9e316eacf4ac3
  ) { }

  ngOnInit() {
<<<<<<< HEAD
    console.log('Dialog got', this.data2);
  }
=======
    
      console.log('Dialog',this.data)
    }
  
>>>>>>> f836ac8791a2c79b13f6028288c9e316eacf4ac3
  
  closeDialog() {
    this.dialogRef.close();
  }


}
  