import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRfmComponent } from './print-rfm.component';

describe('PrintRfmComponent', () => {
  let component: PrintRfmComponent;
  let fixture: ComponentFixture<PrintRfmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintRfmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintRfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
