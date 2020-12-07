import { Component, OnInit } from '@angular/core';
import { Timeslot } from 'src/app/models/timeslot';
import { User } from 'src/app/models/user';
import { Appointment } from 'src/app/models/appointment';
import { Location } from 'src/app/models/location';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Haircut } from 'src/app/models/haircut';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { TimeslotService } from 'src/app/services/timeslot.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.css'],
})
export class CreateAppointmentDialogComponent implements OnInit {
  locations: Location[];
  timeslots: Timeslot[];
  barbers: User[];
  haircuts: Haircut[];
  selectedLocation: Location;
  selectedTimeslot: Timeslot;
  selectedBarber: User;
  selectedHaircut: Haircut;

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
      this.selectedTimeslot,
      this.selectedHaircut
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

  update(event): void {
    if (this.selectedLocation === undefined) {
      this.timeslots = [];
      this.barbers = [];
    }
    this.userService
      .getUsersFromLocation(this.selectedLocation)
      .subscribe((data: User[]) => (this.barbers = data));

    this.locationService
      .getHaircuts(this.selectedLocation)
      .subscribe((data: Haircut[]) => {
        this.haircuts = data;
      });
    this.timeslots = [];
  }

  updateTimeslot(event): void {
    this.timeslotService
      .getFreeTimeslots(this.selectedBarber._id, this.selectedLocation._id)
      .subscribe((data: Timeslot[]) => (this.timeslots = data));
  }
}
