import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateAppointmentDialogComponent } from 'src/app/create-appointment-dialog/create-appointment-dialog.component';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[];

  constructor(
    public authService: AuthService,
    private locationService: LocationService,
    private appointmentService: AppointmentService,
    private _snackBar: MatSnackBar,
    public appointmentDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.appointmentService
      .getAppointmentsByUser(this.authService.user)
      .subscribe((data: any) => {
        this.appointments = data;
      });
  }

  openDialog(): void {
    const dialogRef = this.appointmentDialog.open(
      CreateAppointmentDialogComponent,
      {
        width: '600px',
      }
    );
    dialogRef.beforeClosed();
  }
}
