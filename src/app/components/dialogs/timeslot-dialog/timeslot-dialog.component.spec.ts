import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TimeslotService } from 'src/app/services/timeslot.service';
import { UserService } from 'src/app/services/user.service';

import { TimeslotDialogComponent } from './timeslot-dialog.component';
const user: User = {
  _id: '',
  firstName: '',
  lastName: '',
  streetAddress: '',
  postalCode: '',
  city: '',
  dateOfBirth: new Date(),
  phoneNumber: 1,
  email: '',
  password: '',
  employee: true,
  location: undefined,
  timeslot: [],
  appointments: [],
};

describe('TimeslotDialogComponent', () => {
  let component: TimeslotDialogComponent;
  let fixture: ComponentFixture<TimeslotDialogComponent>;

  let userServiceSpy;
  let timeslotServiceSpy;
  let authServiceSpy;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('locationService', [
      'getFreeEmployees',
      'register',
      'put',
      'getUsersFromLocation',
    ]);
    timeslotServiceSpy = jasmine.createSpyObj('locationService', [
      'getFreeTimeslots',
      'addTimeslot',
    ]);
    authServiceSpy = jasmine.createSpyObj('locationService', [
      'login',
      'logout',
    ]);

    TestBed.configureTestingModule({
      declarations: [TimeslotDialogComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatListModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TimeslotService, useValue: timeslotServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialogRef, useValue: MatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: user },
        { provide: MatSnackBar, useValue: MatSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
