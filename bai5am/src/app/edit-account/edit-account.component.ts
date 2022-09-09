import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<EditAccountComponent>,
   
  ) { }


  ngOnInit() {
    console.log('Dialog got');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}