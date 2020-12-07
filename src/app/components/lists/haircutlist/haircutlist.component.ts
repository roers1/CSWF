import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Haircut } from 'src/app/models/haircut';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { HaircutDialogComponent } from '../../dialogs/haircut-dialog/haircut-dialog.component';

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
