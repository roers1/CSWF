import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('locationService', [
      'login',
      'logout',
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: MatSnackBar },
        { provide: Router, useValue: Router },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have an email input field', (done) => {
    fixture.detectChanges();
    let x = fixture.debugElement.query(By.css('#emailInputField'));
    expect(x).toBeTruthy();
    done();
  });

  it('Should have an password input field', (done) => {
    fixture.detectChanges();
    let x = fixture.debugElement.query(By.css('#passwordInputField'));
    expect(x).toBeTruthy();
    done();
  });

  it('Should have an login button', (done) => {
    fixture.detectChanges();
    let x = fixture.debugElement.query(By.css('#submitButton'));
    expect(x).toBeTruthy();
    done();
  });

  it('Should have an title which contains log in', (done) => {
    fixture.detectChanges();
    let x = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(x.innerHTML).toContain(`Log in`);
    done();
  });
});
