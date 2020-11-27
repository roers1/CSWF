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
    const dialogRef = this.employeeDialog.open(EmployeeListDialog, {
      width: '250px',
      data: this.employees,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
