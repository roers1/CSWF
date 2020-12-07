import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AlertComponent } from './alert.component';

const message = [];
describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertServiceSpy;
  let getMessageSpy;

  beforeEach(() => {
    alertServiceSpy = jasmine.createSpyObj('alertService', [
      'success',
      'error',
      'getMessage',
    ]);

    getMessageSpy = alertServiceSpy.getMessage.and.returnValue(of(message));

    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [],
      providers: [{ provide: AlertService, useValue: alertServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
