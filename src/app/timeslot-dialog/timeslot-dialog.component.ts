import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { Timeslot } from 'src/models/timeslot';
import { User } from 'src/models/user';
import { EmployeeListDialogComponent } from '../employee-list-dialog/employee-list-dialog.component';
import { MyErrorStateMatcher } from '../ErrorStateMatcher/ErrorStateMatcher';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
const moment = require('moment');
moment().format();

@Component({
  selector: 'app-timeslot-dialog',
  templateUrl: './timeslot-dialog.component.html',
  styleUrls: ['./timeslot-dialog.component.css'],
})
export class TimeslotDialogComponent implements OnInit {
  MINUTE_REGEX = /^((?:[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])?|60)$/;
  HOUR_REGEX = /^((?:[1-9]|1[0-9]|2[0-3])?|24)$/;

  router: any;
  constructor(
    public dialogRef: MatDialogRef<EmployeeListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    public userService: UserService,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  registerForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    startTimeHour: new FormControl('', [
      Validators.required,
      Validators.pattern(this.HOUR_REGEX),
    ]),
    startTimeMinute: new FormControl('', [
      Validators.required,
      Validators.pattern(this.MINUTE_REGEX),
    ]),
    endTimeHour: new FormControl('', [
      Validators.required,
      Validators.pattern(this.HOUR_REGEX),
    ]),
    endTimeMinute: new FormControl('', [
      Validators.required,
      Validators.pattern(this.MINUTE_REGEX),
    ]),
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
