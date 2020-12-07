import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeschrijvingComponent } from './beschrijving.component';

describe('BeschrijvingComponent', () => {
  let component: BeschrijvingComponent;
  let fixture: ComponentFixture<BeschrijvingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeschrijvingComponent],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeschrijvingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
