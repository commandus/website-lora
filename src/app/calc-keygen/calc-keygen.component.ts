import { Component, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EnvService } from '../../svc/env';
import { NetId } from '../../model/netid';
import { KeyGenResponse } from '../../model/keygenresponse';

@Component({
  selector: 'app-calc-keygen',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './calc-keygen.component.html',
  styleUrl: './calc-keygen.component.css'
})
export class CalcKeygenComponent implements OnInit {
  
    @Input() @Output() value: KeyGenResponse = new KeyGenResponse;
  
    public formGroup: FormGroup = new FormGroup({});
  
    constructor(
      private formBuilder: FormBuilder,
      public env: EnvService
    ) { 
  
    }
  
    ngOnInit(): void {
      if (!this.value)
      this.value = new KeyGenResponse;
      this.formGroup = this.formBuilder.group({
          addr: [this.value.addr ? this.value.addr : '', [ Validators.required ]],
          masterkey: ['', [ Validators.required ]]
      });
    }
  
    load(masterkey: string, addr: string): void {
      this.env.calc.keygen(masterkey, addr).subscribe(v => {
        this.value = v;
      })
    }
  
    onChanged($event: any) {
      const v = this.formGroup.getRawValue();
      this.value.addr = v.addr;
      this.load(v.masterkey, v.addr);
    }
  }
  