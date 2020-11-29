import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { Location } from '../../models/location';
import { User } from '../../models/user';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeListDialogComponent } from '../employee-list-dialog/employee-list-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: User[];

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public locationService: LocationService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar,
    public employeeDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getFreeEmployees();
  }

  getFreeEmployees(): void {
    this.userService
      .getFreeEmployees()
      .subscribe((employees) => (this.employees = employees));
  }

  openDialog(): void {
    const dialogRef = this.employeeDialog.open(EmployeeListDialogComponent, {
      width: '250px',
      data: this.employees,
    });
    dialogRef.beforeClosed().subscribe((employee) => {
      console.log('employee');
      this.locationService
        .addUser(this.locationService.location._id, employee._id)
        .subscribe(() => {
          this.locationService
            .getLocation(this.locationService.location._id)
            .subscribe(
              (data: any) => {
                this.locationService.location = data;
                this._snackBar.open(data['message'], 'Ok', {
                  duration: 2000,
                });
              },
              (error) => {
                console.log(error);
                this._snackBar.open(
                  error.error.message || error.message,
                  'Ok,',
                  {
                    duration: 3000,
                  }
                );
              }
            );
        });
    });
  }
}
