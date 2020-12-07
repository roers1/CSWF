import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { Location } from 'src/app/models/location';
import { Timeslot } from 'src/app/models/timeslot';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MyAccountComponent } from './my-account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterTestingModule } from '@angular/router/testing';
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
class DummyComponent {}
describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;
  let userServiceSpy;
  let authServiceSpy;
  let routerStub;
  beforeEach(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate'),
    };

    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getFreeEmployees',
      'register',
      'put',
      'getUsersFromLocation',
    ]);

    authServiceSpy = jasmine.createSpyObj('authService', ['login', 'logout']);

    authServiceSpy.user = user;

    TestBed.configureTestingModule({
      declarations: [MyAccountComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatDatepickerModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatDialog, useValue: MatDialog },
        { provide: MatSnackBar, useValue: MatSnackBar },
        { provide: RouterTestingModule, useValue: routerStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const PHONENUMBER_REGEX = /(^(316|06|6)([0-9]{8}))$/;
    const POSTAL_CODE_REGEX = /(^[1-9][0-9]{3})([\s]?)((?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2})$/;

    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
