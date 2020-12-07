import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

import { HaircutDialogComponent } from './haircut-dialog.component';

const locations = [
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

describe('HaircutDialogComponent', () => {
  let locationServiceSpy;
  let getLocationsSpy;
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

  let component: HaircutDialogComponent;
  let fixture: ComponentFixture<HaircutDialogComponent>;

  getLocationsSpy = locationServiceSpy.getLocations.and.returnValue(
    of(locations)
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HaircutDialogComponent],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: MatDialogRef, useValue: MatDialogRef },
        { provide: MatSnackBar, useValue: MatSnackBar },
      ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaircutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
