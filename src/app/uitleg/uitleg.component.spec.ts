import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UitlegComponent } from './uitleg.component';

describe('UitlegComponent', () => {
  let component: UitlegComponent;
  let fixture: ComponentFixture<UitlegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UitlegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UitlegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
