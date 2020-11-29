import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../login/login.component';
import { Location } from '../../models/location';

@Component({
  selector: 'app-location-menu',
  templateUrl: './location-menu.component.html',
  styleUrls: ['./location-menu.component.css'],
})
export class LocationMenuComponent implements OnInit {
  loading = false;
  submitted = false;
  updatedLocation: Location;
  id: string;

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public locationService: LocationService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getLocation();
  }

  getLocation(): void {
    this.locationService
      .getLocation(this.id)
      .subscribe((data: any) => (this.locationService.location = data));
    console.log(this.locationService.location);
  }
}
