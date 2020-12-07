import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { HaircutlistComponent } from './haircutlist.component';

let haircuts = [];

describe('HaircutlistComponent', () => {
  let component: HaircutlistComponent;
  let fixture: ComponentFixture<HaircutlistComponent>;
  let locationServiceSpy;
  let authServiceSpy;
  let getHaircutsSpy;
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

    getHaircutsSpy = locationServiceSpy.getHaircuts.and.returnValue(
      of(haircuts)
    );

    TestBed.configureTestingModule({
      declarations: [HaircutlistComponent],
      imports: [MatListModule],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialog, useValue: MatDialog },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaircutlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
