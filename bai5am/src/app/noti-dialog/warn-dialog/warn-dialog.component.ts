import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warn-dialog',
  templateUrl: './warn-dialog.component.html',
  styleUrls: ['./warn-dialog.component.scss']
})
export class WarnDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<WarnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}


}
