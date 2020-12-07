import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentsComponent } from './appointments.component';
import { Appointment } from '../../../models/appointment';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';

let appointment = [];
describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;
  let authServiceSpy;
  let appointmentServiceSpy;
  let getAppointmentsByUserSpy;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('locationService', [
      'login',
      'logout',
    ]);
    appointmentServiceSpy = jasmine.createSpyObj('locationService', [
      'getAppointmentsByUser',
      'getAppointmentsByLocation',
      'postAppointment',
    ]);

    getAppointmentsByUserSpy = appointmentServiceSpy.getAppointmentsByUser.and.returnValue(
      of(appointment)
    );

    TestBed.configureTestingModule({
      declarations: [AppointmentsComponent],
      imports: [MatListModule],
      providers: [
        { provide: AppointmentService, useValue: appointmentServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialog, useValue: MatDialog },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
