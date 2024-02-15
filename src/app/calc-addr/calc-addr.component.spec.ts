import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcAddrComponent } from './calc-addr.component';

describe('CalcAddrComponent', () => {
  let component: CalcAddrComponent;
  let fixture: ComponentFixture<CalcAddrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcAddrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcAddrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
