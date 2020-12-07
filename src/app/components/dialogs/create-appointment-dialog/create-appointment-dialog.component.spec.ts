import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateAppointmentDialogComponent } from './create-appointment-dialog.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { TimeslotService } from 'src/app/services/timeslot.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '../../../models/location';
import { Haircut } from 'src/app/models/haircut';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const locations: Location[] = [
  {
    _id: '5fc92ca206da013f40642cce',
    name: 'Best',
    streetAddress: 'Magnolia 23',
    postalCode: '5682EL',
    city: 'Best',
    phoneNumber: 618440009,
    email: 'Rubenvanoers@outlook.com',
    createdOn: new Date(),
    employee: [],
    haircut: [],
  },
];

describe('CreateAppointmentDialogComponent', () => {
  let locationServiceSpy;
  let userServiceSpy;
  let timeslotServiceSpy;
  let authServiceSpy;
  let appointmentServiceSpy;

  let getLocationsSpy;
  let component: CreateAppointmentDialogComponent;
  let fixture: ComponentFixture<CreateAppointmentDialogComponent>;

  beforeEach(() => {
    locationServiceSpy = jasmine.createSpyObj('locationService', [
      'register',
      'getLocations',
      'addHaircut',
      'getHaircuts',
      'addUser',
      'update',
      'delete',
      'getLocation',
      'searchLocations',
    ]);
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
    appointmentServiceSpy = jasmine.createSpyObj('locationService', [
      'getAppointmentsByUser',
      'getAppointmentsByLocation',
      'postAppointment',
    ]);

    getLocationsSpy = locationServiceSpy.getLocations.and.returnValue(
      of(locations)
    );

    TestBed.configureTestingModule({
      declarations: [CreateAppointmentDialogComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: TimeslotService, useValue: timeslotServiceSpy },
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialogRef, useValue: MatDialogRef },
        { provide: MatSnackBar, useValue: MatSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAppointmentDialogComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
