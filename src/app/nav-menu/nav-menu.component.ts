import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';

export interface Section {
  name: string;
  desc: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatSidenavModule, MatButtonModule, MatMenuModule, MatListModule, MatDividerModule, DatePipe],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  expanded = false;

  constructor(
    private router: Router
  )
  {
  }

  calcs: Section[] = [
    {
      name: 'Адрес',
      desc: 'Идентификатор сети',
      path: 'netid',
      icon: 'folder'
    },
    {
      name: 'Ключи',
      desc: 'Генератор ключей',
      path: 'keygen',
      icon: 'folder'
    }
  ];
  parsers: Section[] = [
    {
      name: 'Радио',
      desc: 'Радио пакет',
      path: 'rfm',
      icon: 'note'
    },
    {
      name: 'Шлюз',
      desc: 'Пакет от шлюза',
      path: 'gw',
      icon: 'note'
    }
  ];

  nav(path: string): void {
    this.router.navigateByUrl(path);
    this.drawer.close();
  }
}
