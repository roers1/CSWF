import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyErrorStateMatcher } from '../ErrorStateMatcher/ErrorStateMatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_REGEX),
      Validators.maxLength(80),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.authService.logout();
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this._snackBar.open(data['message'], 'Ok', {
            duration: 2000,
          });
          this.router.navigate(['']);
        },
        (error) => {
          this._snackBar.open(error, 'Ok', {
            duration: 2000,
          });
        }
      );
  }
}
