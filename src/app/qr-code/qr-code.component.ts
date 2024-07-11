import { Component, Input, Output } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { QRCode } from '../../model/qrcode';
import { EnvService } from '../../svc/env';
import { MatSlideToggle } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSlideToggle],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss'
})
export class QrCodeComponent {
  urn = '';

  @Input() @Output() value = new QRCode;
  join_eui = new FormControl(this.value.join_eui ? this.value.join_eui : '', [ Validators.required, this.EUIValidator ]);
  dev_eui = new FormControl(this.value.dev_eui ? this.value.dev_eui : '', [ Validators.required, this.EUIValidator ]);
  profile_id = new FormControl(this.value.profile_id ? this.value.profile_id : '', [Validators.required, this.ProfileIdValidator]);
  owner_token = new FormControl(this.value.owner_token ? this.value.owner_token : '', []);
  serial_number = new FormControl(this.value.serial_number ? this.value.serial_number : '', []);
  proprietary = new FormControl(this.value.proprietary ? this.value.proprietary : '', []);
  requireCRC = new FormControl(this.value.requireCRC ? this.value.requireCRC : false, []);
  
  constructor(
    public env: EnvService
  ) { 
  }

  private EUIValidator(control: AbstractControl): { [key: string]: any } | null {
    
    if(!control.value) 
      return null;
    const reg = /^([0-9A-Fa-f]){16}$/i;
    const s = control.value + '';
    if (s.length == 0)
      return null;
    if (!reg.test(s))
      return { invalidSymbols: true };
    return null;
  }

  private ProfileIdValidator(control: AbstractControl): { [key: string]: any } | null {
    if(!control.value) 
      return null;
    const reg = /^([0-9A-Fa-f]){8}$/i;
    const s = control.value + '';
    if (s.length == 0)
      return null;
    if (!reg.test(s))
      return { invalidSymbols: true };
    return null;
  }

  load() {
    this.env.calc.urn(this.value).subscribe(v => {
      this.urn = v;
      this.env.calc.qr(this.value).subscribe(v => {
        console.log(v);
      });
    });

  }

  onSubmit() {
    this.value.join_eui = this.join_eui.value ? this.join_eui.value : '';
    this.value.dev_eui = this.dev_eui.value ? this.dev_eui.value : '';
    this.value.profile_id = this.profile_id.value ? this.profile_id.value : '';
    this.value.owner_token = this.owner_token.value ? this.owner_token.value : '';
    this.value.serial_number = this.serial_number.value ? this.serial_number.value : '';
    this.value.proprietary = this.proprietary.value ? this.proprietary.value : '';
    this.value.requireCRC = this.requireCRC.value ? this.requireCRC.value : false;
    this.load();
  }

}
