import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HaircutDialogComponent } from '../haircut-dialog/haircut-dialog.component';
import { Haircut } from '../models/haircut';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-haircutlist',
  templateUrl: './haircutlist.component.html',
  styleUrls: ['./haircutlist.component.css'],
})
export class HaircutlistComponent implements OnInit {
  haircuts: Haircut[];

  constructor(
    public authService: AuthService,
    private locationService: LocationService,
    private appointmentService: AppointmentService,
    private _snackBar: MatSnackBar,
    public haircutDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.locationService
      .getHaircuts(this.locationService.location)
      .subscribe((data: any) => (this.haircuts = data));
  }

  openDialog(): void {
    const dialogRef = this.haircutDialog.open(HaircutDialogComponent, {
      width: '600px',
    });
    dialogRef.beforeClosed();
  }
}
