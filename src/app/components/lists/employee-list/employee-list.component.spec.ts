import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from 'src/app/models/user';
import { Location } from 'src/app/models/location';
import { Timeslot } from 'src/app/models/timeslot';
import { Appointment } from 'src/app/models/appointment';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { EmployeeListComponent } from './employee-list.component';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';

const users: User[] = [
  {
    _id: '5fc7d9ca5a8d1434f46cb08f',
    firstName: 'Ruben',
    lastName: 'van Oers',
    streetAddress: 'Magnolia 23',
    postalCode: '5682EL',
    city: 'Best',
    dateOfBirth: new Date(),
    phoneNumber: 618440009,
    email: 'Rubenvanoers@outlook.com',
    password: '$2b$10$JMv/Vtx6GxCqeKwGby6Joe9pyGu40y.THLgKgX29y6LMOS5nzl2qq',
    employee: false,
    location: {
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
    timeslot: [],
    appointments: [],
  },
];

const location = {
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
};

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let locationServiceSpy;
  let authServiceSpy;
  let userServiceSpy;
  let getFreeEmployeesSpy;

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
    authServiceSpy = jasmine.createSpyObj('locationService', [
      'login',
      'logout',
    ]);
    userServiceSpy = jasmine.createSpyObj('locationService', [
      'getFreeEmployees',
      'register',
      'put',
      'getUsersFromLocation',
    ]);

    getFreeEmployeesSpy = userServiceSpy.getFreeEmployees.and.returnValue(
      of(users)
    );

    locationServiceSpy.location = location;

    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [RouterModule.forRoot([]), MatListModule],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: MatSnackBar, useValue: MatSnackBar },
        { provide: MatDialog, useValue: MatDialog },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
