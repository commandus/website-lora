import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintGwComponent } from './print-gw.component';

describe('PrintGwComponent', () => {
  let component: PrintGwComponent;
  let fixture: ComponentFixture<PrintGwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintGwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintGwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
