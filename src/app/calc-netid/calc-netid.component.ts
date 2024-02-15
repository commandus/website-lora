import { Component, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class CalcNetidComponent implements OnInit {
  
  @Input() @Output() value: NetId = new NetId;
  binPrefix = '';
  binNwkid = '';
  binAddr = '';
  hexAddr = '';
  addrCapacity = 0;

  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    public env: EnvService
  ) { 

  }

  ngOnInit(): void {
    if (!this.value)
    this.value = new NetId;
    this.formGroup = this.formBuilder.group({
      addr: [this.value.addr ? this.value.addr : '',
        [ Validators.required ]
      ]
    });
  }

  load(addr: string): void {
    this.env.calc.netid(addr).subscribe(v => {
      this.value = v;
      if (addr == '') {
        this.addrCapacity = 0;
        return;
      }

      this.binPrefix = v.binary.substring(0, v.prefixlen);
      this.binNwkid = v.binary.substring(v.prefixlen, v.prefixlen + v.nwkidlen);
      this.binAddr = v.binary.substring(v.prefixlen + v.nwkidlen);
      this.hexAddr = (parseInt(v.addr, 16) & ((1 << v.addrlen) - 1)).toString(16);
      this.addrCapacity = parseInt(v.addrMax, 16) - parseInt(v.addrMin, 16);
    })
  }

  onAddrChanged($event: any) {
    this.value.addr = this.formGroup.getRawValue().addr;
    this.load(this.value.addr);
  }
}
