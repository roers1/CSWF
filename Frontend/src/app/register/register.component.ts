import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../services';
import { User } from '../models';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

    const user = new User(
      '1',
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.streetAddress,
      this.registerForm.value.postalCode,
      this.registerForm.value.city,
      this.registerForm.value.dateOfBirth,
      this.registerForm.value.phoneNumber,
      this.registerForm.value.email,
      this.registerForm.value.password,
      false
    );

    this.userService
      .register(user)
      .pipe(first())
      .subscribe(
        (a) => console.log(a),
        (b) => {
          console.log(b);
        }
      );

    // (data) => {
    //   console.log(data);
    //   this.alertService.success('Registration successful', true);
    //   this.router.navigate(['/login']);
    // },
    // (error) => {
    //   console.log(error);
    //   this.alertService.error(error);
    //   this.loading = false;
    // }
  }
}
