import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/models/user';

@Component({
  selector: 'app-employee-list-dialog',
  templateUrl: './employee-list-dialog.component.html',
  styleUrls: ['./employee-list-dialog.component.css'],
})
export class EmployeeListDialogComponent implements OnInit {
  selectedUser: User;

  constructor(
    public dialogRef: MatDialogRef<EmployeeListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public employees: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
