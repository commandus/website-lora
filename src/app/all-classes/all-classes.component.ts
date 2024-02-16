import { Component, OnInit } from '@angular/core';

import { EnvService } from '../../svc/env';
import { ClassResponse } from '../../model/classesresponse';

@Component({
  selector: 'app-all-classes',
  standalone: true,
  imports: [],
  templateUrl: './all-classes.component.html',
  styleUrl: './all-classes.component.scss'
})
export class AllClassesComponent implements OnInit {
    value: ClassResponse[] = [];
    
    constructor(
      public env: EnvService
    ) { 
  
    }

    ngOnInit(): void {
      this.load();
    }
  
    load(): void {
      this.env.calc.classes().subscribe(v => {
        this.value = v;
      })
    }

    bits2len(v: number) : number {
      return (1 << v);
    }
  }
  