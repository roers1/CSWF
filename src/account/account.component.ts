import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/_models';
import {
  AlertService,
  AuthenticationService,
  UserService,
} from 'src/_services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [Validators.required],
      lastName: [Validators.required],
      streetAddress: [Validators.required],
      postalCode: [Validators.required],
      city: [Validators.required],
      phoneNumber: [Validators.required],
      email: [Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .update(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success(data['message'], true);
          this.loading = false;
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
