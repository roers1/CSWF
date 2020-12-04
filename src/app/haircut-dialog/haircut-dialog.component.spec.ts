import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaircutDialogComponent } from './haircut-dialog.component';

describe('HaircutDialogComponent', () => {
  let component: HaircutDialogComponent;
  let fixture: ComponentFixture<HaircutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaircutDialogComponent ]
    })
    .compileComponents();
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
