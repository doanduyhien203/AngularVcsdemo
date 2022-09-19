import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({ 
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',

})


export class EditAccountComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {
    console.log('Dialog got', this.data);
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
 
}
  