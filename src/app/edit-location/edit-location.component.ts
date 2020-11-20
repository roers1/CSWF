import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css'],
})
export class EditLocationComponent implements OnInit {
  loading = false;
  submitted = false;
  @Input() location: Location;

  registerForm: FormGroup;
  constructor(
    public authService: AuthService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [this.location.name, Validators.required],
      streetAddress: [this.location.streetAddress, Validators.required],
      postalCode: [this.location.postalCode, Validators.required],
      city: [this.location.city, Validators.required],
      phoneNumber: [this.location.phoneNumber, Validators.required],
      email: [this.location.email, Validators.required],
    });
  }

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
    this.locationService
      .update(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success(data['message'], true);
          this.router.navigate(['..']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
