import { Component, OnInit } from '@angular/core';
import { Timeslot } from 'src/app/models/timeslot';
import { User } from 'src/app/models/user';
import { Appointment } from 'src/app/models/appointment';
import { Location } from 'src/app/models/location';
import { MatDialogRef } from '@angular/material/dialog';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { TimeslotService } from '../services/timeslot.service';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.css'],
})
export class CreateAppointmentDialogComponent implements OnInit {
  locations: Location[];
  timeslots: Timeslot[];
  barbers: User[];
  selectedLocation: Location;
  selectedTimeslot: Timeslot;
  selectedBarber: User;

  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
    public locationService: LocationService,
    public userService: UserService,
    public timeslotService: TimeslotService,
    public appointmentService: AppointmentService,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.locationService
      .getLocations()
      .subscribe((data: Location[]) => (this.locations = data));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  AddAppointment(): void {
    const appointment = new Appointment(
      this.authService.user,
      this.selectedLocation,
      this.selectedTimeslot
    );

    this.appointmentService.postAppointment(appointment).subscribe(
      (data) => {
        this._snackBar.open(data['message'], 'Ok', {
          duration: 2000,
        });
      },
      (error) => {
        this._snackBar.open(error.error.message, 'Ok,', {
          duration: 3000,
        });
      }
    );
    this.dialogRef.close();
  }

  updateEmployee(event): void {
    if (this.selectedLocation === undefined) {
      this.timeslots = [];
      this.barbers = [];
    }
    this.userService
      .getUsersFromLocation(this.selectedLocation)
      .subscribe((data: User[]) => (this.barbers = data));
    this.timeslots = [];
  }

  updateTimeslot(event): void {
    this.timeslotService
      .getFreeTimeslots(this.selectedBarber._id, this.selectedLocation._id)
      .subscribe((data: Timeslot[]) => (this.timeslots = data));
  }

  CHECKLOCATION(): void {
    console.log(this.locations);
    console.log(this.barbers);
    console.log(this.timeslots);
  }
}
