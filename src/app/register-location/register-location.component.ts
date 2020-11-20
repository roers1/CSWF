import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-location',
  templateUrl: './register-location.component.html',
  styleUrls: ['./register-location.component.css'],
})
export class RegisterLocationComponent implements OnInit {
  loading = false;
  submitted = false;
  @Input() registerStatus: boolean;
  @Output() registerStatusChange = new EventEmitter<boolean>();

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
      name: ['', Validators.required],
      streetAddress: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
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
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success(data['message'], true);
          this.router.navigate(['..']);
          this.registerStatusChange.emit(false);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
