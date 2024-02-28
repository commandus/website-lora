import { Component, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EnvService } from '../../svc/env';
import { KeyGenResponse } from '../../model/keygenresponse';

@Component({
  selector: 'app-calc-keygen',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './calc-keygen.component.html',
  styleUrl: './calc-keygen.component.scss'
})
export class CalcKeygenComponent {
  
    @Input() @Output() value: KeyGenResponse = new KeyGenResponse;
  
    addr = new FormControl(this.value.addr ? this.value.addr : '', [ Validators.required ]);
    masterkey = new FormControl('', [ Validators.required ]);

    constructor(
      public env: EnvService
    ) { 
  
    }
  
    load(masterkey: string, addr: string): void {
      this.env.calc.keygen(masterkey, addr).subscribe(v => {
        this.value = v;
      })
    }
  
    onSubmit() {
      this.load(this.masterkey.value ? this.masterkey.value : '', this.addr.value ? this.addr.value as string : '');
    }
  }
  