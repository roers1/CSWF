import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';

import { LocationComponent } from './location.component';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;
  let locationServiceSpy;
  let authServiceSpy;

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

    TestBed.configureTestingModule({
      declarations: [LocationComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: MatSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
