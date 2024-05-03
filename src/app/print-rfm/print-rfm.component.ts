import { Component, Input, Output } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { EnvService } from '../../svc/env';
import { RFM } from '../../model/rfm';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-print-rfm',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule,
    MatIconModule, MatTooltipModule, FlexLayoutModule],
  templateUrl: './print-rfm.component.html',
  styleUrl: './print-rfm.component.scss'
})
export class PrintRfmComponent {
    @Input() @Output() value = new RFM;
    packetHex = '';
    packet = new FormControl('', [ Validators.required ]);
  
    constructor(
      public env: EnvService
    ) { 
  
    }
    
    load(): void {
      this.env.calc.rfm(this.packetHex).subscribe(v => {
        this.value = new RFM(v);
      })
    }
  
    onChanged($event: any) {
      this.packetHex = this.packet.value ? this.packet.value as string : '';
      this.load();
    }
  }
  