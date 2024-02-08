import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcNetidComponent } from './calc-netid.component';

describe('CalcNetidComponent', () => {
  let component: CalcNetidComponent;
  let fixture: ComponentFixture<CalcNetidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcNetidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcNetidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
