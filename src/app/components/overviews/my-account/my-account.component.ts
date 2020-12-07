import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { TimeslotDialogComponent } from '../../dialogs/timeslot-dialog/timeslot-dialog.component';
import { MyErrorStateMatcher } from '../../misc/ErrorStateMatcher/ErrorStateMatcher';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  POSTAL_CODE_REGEX = /(^[1-9][0-9]{3})([\s]?)((?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2})$/;
  PHONENUMBER_REGEX = /(^(316|06|6)([0-9]{8}))$/;

  updatedUser: User;

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern(this.POSTAL_CODE_REGEX),
    ]),
    city: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
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
    private router: Router,
    private userService: UserService,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    public timeslotDialog: MatDialog
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.updatedUser = this.registerForm.value;
    this.updatedUser._id = this.authService.user._id;
    this.userService
      .put(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open(data['message'], 'Ok', {
            duration: 2000,
          });
          this.router.navigate(['..']);
        },
        (error) => {
          this._snackBar.open(error.error.message || error.message, 'Ok,', {
            duration: 3000,
          });
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.timeslotDialog.open(TimeslotDialogComponent, {
      width: '800px',
      data: this.authService.user,
    });
    dialogRef.beforeClosed().subscribe(() => {});
  }
}
