import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { EnvService } from '../../svc/env';
import { DarkModeSwitchComponent } from '../../dark-mode-switch/dark-mode-switch.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubscribeComponent } from "../subscribe/subscribe.component";


@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, DarkModeSwitchComponent, SubscribeComponent],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent implements OnInit{
  public version = '';

  constructor(
    private router: Router,
    public env: EnvService
  )
  {
  }

  ngOnInit(): void {
    this.env.calc.version().subscribe(v => this.version = v.version);
  }

  nav(path: string): void {
    this.router.navigateByUrl(path);
  }

}
