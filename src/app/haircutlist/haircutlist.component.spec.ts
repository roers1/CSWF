import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaircutlistComponent } from './haircutlist.component';

describe('HaircutlistComponent', () => {
  let component: HaircutlistComponent;
  let fixture: ComponentFixture<HaircutlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaircutlistComponent ]
    })
    .compileComponents();
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
