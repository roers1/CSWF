import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateAppointmentDialogComponent } from '../../dialogs/create-appointment-dialog/create-appointment-dialog.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[];

  constructor(
    public authService: AuthService,
    private appointmentService: AppointmentService,
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
        width: '800px',
      }
    );
    dialogRef.beforeClosed();
  }
}
