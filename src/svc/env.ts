import { Injectable } from '@angular/core';
import { CalcService } from './calc.svc';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
    constructor(
        public calc: CalcService
    ) {
        // this.calc.version().subscribe(v => this.version = v.version);
    }
}
