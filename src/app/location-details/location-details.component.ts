import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../login/login.component';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../models/location';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent implements OnInit {
  loading = false;
  submitted = false;
  location: Location;
  updatedLocation: Location;
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_REGEX),
    ]),
  });

  matcher = new MyErrorStateMatcher();
  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    private locationService: LocationService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.locationService
      .getLocation(id)
      .subscribe((data: any) => (this.location = data));
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;
    this.updatedLocation = this.updateForm.value;
    this.updatedLocation._id = this.location._id;
    this.locationService
      .update(this.updatedLocation, this.authService.user)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open(data['message'], 'Ok', {
            duration: 2000,
          });
          this.router.navigate(['/location']);
        },
        (error) => {
          this._snackBar.open(error.error.message || error.message, 'Ok,', {
            duration: 3000,
          });
        }
      );
  }
}
