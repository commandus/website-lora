import { Component, Input, Output } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { EnvService } from '../../svc/env';
import { GwResponse } from '../../model/gwresponse';

@Component({
  selector: 'app-print-gw',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './print-gw.component.html',
  styleUrl: './print-gw.component.scss'
})
export class PrintGwComponent {
      @Input() @Output() value = new GwResponse;
      packetHex = '';
      packet = new FormControl('', [ Validators.required ]);
    
      constructor(
        public env: EnvService
      ) { 
    
      }
    
      load(): void {
        this.env.calc.gw(this.packetHex).subscribe(v => {
          if (v.code) {
            this.value.code = v.code;
            this.value.error = v.error;
          } else {
            this.value = v;
          }
        })
      }
    
      onChanged($event: any) {
        this.packetHex = this.packet.value ? this.packet.value as string : '';
        this.load();
      }
    }
    