import { Component, Input, Output } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NetId } from '../../model/netid';
import { EnvService } from '../../svc/env';

@Component({
  selector: 'app-calc-addr',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './calc-addr.component.html',
  styleUrl: './calc-addr.component.scss'
})
export class CalcAddrComponent {
  @Input() @Output() value: NetId = new NetId;
  binPrefix = '';
  binNwkid = '';
  binAddr = '';
  hexAddr = '';
  nwkSpace = 0;
  addrSpace = 0;

  nwktype = new FormControl(this.value.type ? this.value.type : 0, [ Validators.required, Validators.min(0), Validators.max(7) ]);
  nwkid = new FormControl(this.value.nwkId ? this.value.nwkId : '', [ Validators.required, this.NetworkValidator ]);
  
  constructor(
    public env: EnvService
  ) { 
    (this.nwkid as any).that = this;
  }

  private validateType(): void {
    if (this.value.type > 7)
      this.value.type = 0;
    if (this.value.type < 0)
      this.value.type = 0;
  }

  // version 1.1
  private DEVADDR_TYPE_SIZES_1_1: { n: number, a:number }[] = [
    { n: 6, a: 25 },    // 0
    { n: 6, a: 24 },    // 1
    { n: 9, a: 20 },    // 2
    { n: 11, a: 17 },   // 3
    { n: 12, a: 15 },   // 4
    { n: 13, a: 13 },   // 5
    { n: 15, a: 10 },   // 6
    { n: 17, a: 7 }     // 7
  ];

  private getAddrSpace() : number {
    this.validateType();
    return (1 << this.DEVADDR_TYPE_SIZES_1_1[this.value.type].a);
  }

  private getNwkSpace() : number {
    this.validateType();
    return (1 << this.DEVADDR_TYPE_SIZES_1_1[this.value.type].n);
  }

  private NWK_SIZES = [
    64, 64, 512, 2048, 4096, 8192, 32768, 131072
  ];

  private NetworkValidator(control: AbstractControl): { [key: string]: any } | null {
    const p : CalcAddrComponent = (control as any).that;
    if (!p)
      return null;
    let t = p.nwktype.value ? p.nwktype.value : 0;
    if ((t < 0) || (t > 7))
      t = 0;

    if(!control.value) 
      return null;
    if ((control.value < 0))
      return { invalidSymbols: true };
    if ((control.value >= p.NWK_SIZES[t]))
      return { invalidSymbols: true };
    return null;
  }

  load(): void {
    this.env.calc.addrs(this.value.type, this.value.nwkId).subscribe(v => {
      this.value = v;
      if (this.value.nwkId == '') {
        this.addrSpace = 0;
        return;
      }
      this.nwkSpace = this.getNwkSpace();
      this.addrSpace = this.getAddrSpace();

      this.binPrefix = v.binary.substring(0, v.prefixlen);
      this.binNwkid = v.binary.substring(v.prefixlen, v.prefixlen + v.nwkidlen);
      this.binAddr = v.binary.substring(v.prefixlen + v.nwkidlen);
      this.hexAddr = (parseInt(v.addr, 16) & ((1 << v.addrlen) - 1)).toString(16);
    });
  }

  onSubmit() {
    this.value.type = this.nwktype.value ? this.nwktype.value : 0;
    this.value.nwkId = this.nwkid.value ? this.nwkid.value : '';
    this.load();
  }
}
