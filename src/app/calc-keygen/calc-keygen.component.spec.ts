import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcKeygenComponent } from './calc-keygen.component';

describe('CalcKeygenComponent', () => {
  let component: CalcKeygenComponent;
  let fixture: ComponentFixture<CalcKeygenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcKeygenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcKeygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
