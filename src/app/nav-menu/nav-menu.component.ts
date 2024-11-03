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
      name: $localize `:@@address:Address`,
      desc: $localize `:@@show-network:Show network`,
      path: 'netid',
      tip: $localize `:@@which-network:Which network does the address belong to`,
      icon: 'tag'
    },
    {
      name: $localize `:@@network:Network`,
      desc: $localize `:@@show-addresses:Show addresses`,
      path: 'addr',
      tip: $localize `:@@address-range-by-type:Address range by network number type 0..7`,
      icon: 'cloud'
    },
    {
      name: $localize `:@@keys:Keys`,
      desc: $localize `:@@keygen:Keygen`,
      path: 'keygen',
      tip: $localize `:@@generate-keys:Generate EUI, nwk & app keys for network address`,
      icon: 'key'
    },
    {
      name: $localize `:@@types:Types`,
      desc: $localize `:@@type-list:List of network types`,
      path: 'classes',
      tip: $localize `:@@types-tip:Address ranges for all network types`,
      icon: '123'
    }
  ];
  parsers: Section[] = [
    {
      name: $localize `:@@radio:Radio`,
      desc: $localize `:@@radio-packet:Radio packet`,
      path: 'rfm',
      tip: $localize `:@@radio-tip:Print the packet transmitted on the air`,
      icon: 'wifi'
    },
    {
      name: $localize `:@@gateway:Gateway`,
      desc: $localize `:@@gateway-packet:Gateway packet`,
      path: 'gw',
      tip: $localize `:@@gateway-tip:Print the packet received from the gateway`,
      icon: 'router'
    }
  ];

  qrcode: Section[] = [
    {
      name: $localize `:@@qrcode:QR code`,
      desc: $localize `:@@show-qrcode:Show identity QR code`,
      path: 'qr-code',
      tip: $localize `:@@tip-qr-code:QR code identifies end-point device`,
      icon: 'qr_code'
    }
  ];
  
  drawerTip(opened: boolean) : string {
    return opened ? $localize `:@@hide-sidenav:Hide sidenav` : $localize `:@@show-sidenav:Show sidenav`
  }
  
  nav(path: string): void {
    this.router.navigateByUrl(path);
    if (window.innerWidth < 550)
      this.drawer.close();
  }
}
