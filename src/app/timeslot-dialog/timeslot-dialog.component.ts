import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Timeslot } from 'src/models/timeslot';
import { User } from 'src/models/user';
import { EmployeeListDialogComponent } from '../employee-list-dialog/employee-list-dialog.component';
import { MyErrorStateMatcher } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
var moment = require('moment');
moment().format();

@Component({
  selector: 'app-timeslot-dialog',
  templateUrl: './timeslot-dialog.component.html',
  styleUrls: ['./timeslot-dialog.component.css'],
})
export class TimeslotDialogComponent implements OnInit {
  _snackBar: any;
  router: any;
  constructor(
    public dialogRef: MatDialogRef<EmployeeListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    public userService: UserService,
    public authService: AuthService
  ) {}

  registerForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    startTimeHour: new FormControl('', [Validators.required]),
    startTimeMinute: new FormControl('', [Validators.required]),
    endTimeHour: new FormControl('', [Validators.required]),
    endTimeMinute: new FormControl('', [Validators.required]),
  });

  hide = false;
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {}

  addTimeSlot() {
    let startTime = moment(this.registerForm.value.date);
    let endTime = moment(this.registerForm.value.date);

    startTime = moment(startTime)
      .add(this.registerForm.value.startTimeHour, 'h')
      .toDate();
    startTime = moment(startTime)
      .add(this.registerForm.value.startTimeMinute, 'm')
      .toDate();
    endTime = moment(endTime)
      .add(this.registerForm.value.endTimeHour, 'h')
      .toDate();
    endTime = moment(endTime)
      .add(this.registerForm.value.endTimeMinute, 'm')
      .toDate();

    const timeslot = new Timeslot(
      this.authService.user._id,
      startTime,
      endTime
    );

    console.log(timeslot);

    this.userService
      .addTimeSlot(timeslot, this.authService.user)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open(data['message'], 'Ok', {
            duration: 2000,
          });
        },
        (error) => {
          console.log(error);
          this._snackBar.open(error.error.message, 'Ok,', {
            duration: 3000,
          });
        }
      );
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
