import { Component, Input, Output } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NetId } from '../../model/netid';
import { EnvService } from '../../svc/env';

@Component({
  selector: 'app-calc-netid',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './calc-netid.component.html',
  styleUrl: './calc-netid.component.scss'
})

export class CalcNetidComponent {
  
  @Input() @Output() value: NetId = new NetId;
  binPrefix = '';
  binNwkid = '';
  binAddr = '';
  hexAddr = '';
  addrCapacity = 0;
  addr = new FormControl(this.value.addr ? this.value.addr : '', [ Validators.required ]);

  constructor(
    public env: EnvService
  ) { 

  }
  
  load(): void {
    this.env.calc.netid(this.value.addr).subscribe(v => {
      this.value = v;
      if (this.value.addr == '') {
        this.addrCapacity = 0;
        return;
      }

      this.binPrefix = v.binary.substring(0, v.prefixlen);
      this.binNwkid = v.binary.substring(v.prefixlen, v.prefixlen + v.nwkidlen);
      this.binAddr = v.binary.substring(v.prefixlen + v.nwkidlen);
      this.hexAddr = (parseInt(v.addr, 16) & ((1 << v.addrlen) - 1)).toString(16);
      this.addrCapacity = parseInt(v.addrMax, 16) - parseInt(v.addrMin, 16) + 1;
    })
  }

  onSubmit() {
    this.value.addr = this.addr.value ? this.addr.value as string : '';
    this.load();
  }
}
