import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../models/location';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyErrorStateMatcher } from '../ErrorStateMatcher/ErrorStateMatcher';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent implements OnInit {
  loading = false;
  submitted = false;
  updatedLocation: Location;
  id: string;
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  PHONENUMBER_REGEX = /(^(316|06|6)([0-9]{8}))$/;
  POSTAL_CODE_REGEX = /(^[1-9][0-9]{3})([\s]?)((?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2})$/;

  updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern(this.POSTAL_CODE_REGEX),
    ]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(this.PHONENUMBER_REGEX),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_REGEX),
    ]),
  });

  matcher = new MyErrorStateMatcher();
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

  onSubmit() {
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;
    this.updatedLocation = this.updateForm.value;
    this.updatedLocation._id = this.locationService.location._id;
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
