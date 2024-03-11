import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { EnvService } from '../../svc/env';

export interface Section {
  name: string;
  desc: string;
  path: string;
  tip: string;
  icon: string;
}

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatSidenavModule, MatButtonModule, MatTooltipModule, MatMenuModule, MatListModule, MatDividerModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  expanded = false;

  constructor(
    private router: Router,
    public env: EnvService,
    private snackBar: MatSnackBar
  )
  {
  }

  ngOnInit() {
    this.env.isNewVersion.subscribe(value => {
        if (value) {
            let snackBarRef = this.snackBar.open('Доступна новая версия приложения', 'Обновить');
            snackBarRef.afterDismissed().subscribe(() => {
              this.env.cancelUpdateVersion();
            });
            snackBarRef.onAction().subscribe(() => {
              this.env.updateVersion();
            });
        }
    });
    this.env.pwaPlatform.subscribe(value => {
      if (value === 'android') {
          let snackBarRef = this.snackBar.open('Приложение на рабочий стол', 'Установить');
          snackBarRef.afterDismissed().subscribe(() => {
            this.env.addPwaToHomeScreen();
          });
          snackBarRef.onAction().subscribe(() => {
            this.env.closePwa();
          });
      }
      if (value === 'ios') {
        this.snackBar.open('Приложение можно установить на рабочий стол', 'Понятно');
      }
  });
}

  calcs: Section[] = [
    {
      name: 'Адрес',
      desc: 'Показать сеть',
      path: 'netid',
      tip: 'Какой сети принадлежит адрес',
      icon: 'tag'
    },
    {
      name: 'Сеть',
      desc: 'Показать адреса',
      path: 'addr',
      tip: 'Диапазон адресов по номеру сети типа 0..7',
      icon: 'cloud'
    },
    {
      name: 'Ключи',
      desc: 'Генератор ключей',
      path: 'keygen',
      tip: 'Сгенерировать для адреса сети EUI и ключи',
      icon: 'key'
    },
    {
      name: 'Типы',
      desc: 'Список типов сетей',
      path: 'classes',
      tip: 'Диапазоны адресов для всех типов сетей',
      icon: '123'
    }
  ];
  parsers: Section[] = [
    {
      name: 'Радио',
      desc: 'Радио пакет',
      path: 'rfm',
      tip: 'Разобрать пакет, переданный в эфир',
      icon: 'wifi'
    },
    {
      name: 'Шлюз',
      desc: 'Пакет от шлюза',
      path: 'gw',
      tip: 'Разобрать пакет, полученный со шлюза',
      icon: 'router'
    }
  ];

  nav(path: string): void {
    this.router.navigateByUrl(path);
    if (window.innerWidth < 550)
      this.drawer.close();
  }
}
