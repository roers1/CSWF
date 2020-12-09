import { Component, OnInit } from '@angular/core';
import { Timeslot } from 'src/app/models/timeslot';
import { User } from 'src/app/models/user';
import { Location } from 'src/app/models/location';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationService } from 'src/app/services/location.service';
import { MyErrorStateMatcher } from '../../misc/ErrorStateMatcher/ErrorStateMatcher';

@Component({
  selector: 'app-haircut-dialog',
  templateUrl: './haircut-dialog.component.html',
  styleUrls: ['./haircut-dialog.component.css'],
})
export class HaircutDialogComponent implements OnInit {
  CURRENCY_REGEX = /^\d+(?:\.\d{0,2})?$/;
  locations: Location[];
  timeslots: Timeslot[];
  barbers: User[];
  selectedLocation: Location;
  selectedTimeslot: Timeslot;
  selectedBarber: User;
  matcher = new MyErrorStateMatcher();
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(this.CURRENCY_REGEX),
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<HaircutDialogComponent>,
    public locationService: LocationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.locationService
      .getLocations()
      .subscribe((data: Location[]) => (this.locations = data));
  }

  onSubmit(): void {
    this.locationService
      .addHaircut(this.registerForm.value, this.locationService.location)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open(data['message'], 'Ok', {
            duration: 2000,
          });
          this.onNoClick();
        },
        (error) => {
          console.log(error);
          this._snackBar.open(error.error.message, 'Ok,', {
            duration: 3000,
          });
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
