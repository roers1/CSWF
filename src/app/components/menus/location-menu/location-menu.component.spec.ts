import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { LocationMenuComponent } from './location-menu.component';

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

describe('LocationMenuComponent', () => {
  let component: LocationMenuComponent;
  let fixture: ComponentFixture<LocationMenuComponent>;

  let locationServiceSpy;
  let authServiceSpy;
  let getLocationsSpy;
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

    getLocationsSpy = locationServiceSpy.getLocation.and.returnValue(
      of(location)
    );

    TestBed.configureTestingModule({
      declarations: [LocationMenuComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (id: number) => {
                  id: 1;
                },
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
