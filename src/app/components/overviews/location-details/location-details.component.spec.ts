import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { LocationDetailsComponent } from './location-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
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
describe('LocationDetailsComponent', () => {
  let component: LocationDetailsComponent;
  let fixture: ComponentFixture<LocationDetailsComponent>;

  let authServiceSpy;
  let locationServiceSpy;
  let getLocationSpy;
  let routerStub;
  beforeEach(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate'),
    };
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

    authServiceSpy = jasmine.createSpyObj('authService', ['login', 'logout']);

    getLocationSpy = locationServiceSpy.getLocation.and.returnValue(
      of(location)
    );

    locationServiceSpy.location = location;

    TestBed.configureTestingModule({
      declarations: [LocationDetailsComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: RouterTestingModule, useValue: routerStub },
        { provide: MatSnackBar, useValue: MatSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
