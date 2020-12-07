import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { EmployeeListDialogComponent } from '../../dialogs/employee-list-dialog/employee-list-dialog.component';

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
    private userService: UserService,
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
                if (this.authService.user._id === employee._id) {
                  this.authService.user.location = this.locationService.location;
                }
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
