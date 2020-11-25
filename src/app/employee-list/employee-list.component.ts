import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { Location } from '../../models/location';
import { User } from '../../models/user';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employee: User[];

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public locationService: LocationService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
