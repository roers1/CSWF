import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MyErrorStateMatcher } from '../../misc/ErrorStateMatcher/ErrorStateMatcher';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-register-location',
  templateUrl: './register-location.component.html',
  styleUrls: ['./register-location.component.css'],
})
export class RegisterLocationComponent implements OnInit {
  loading = false;
  submitted = false;

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  PHONENUMBER_REGEX = /(^(316|06|6)([0-9]{8}))$/;
  POSTAL_CODE_REGEX = /(^[1-9][0-9]{3})([\s]?)((?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2})$/;

  registerForm = new FormGroup({
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

  hide = false;

  matcher = new MyErrorStateMatcher();
  constructor(
    public authService: AuthService,
    private locationService: LocationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.locationService
      .register(this.registerForm.value, this.authService.user._id)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open(data['message'], 'Ok', {
            duration: 2000,
          });
          this.router.navigate(['/location']);
        },
        (error) => {
          this._snackBar.open(error.error.message, 'Ok,', {
            duration: 3000,
          });
        }
      );
  }
}
