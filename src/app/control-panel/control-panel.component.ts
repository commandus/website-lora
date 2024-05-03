import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [TopMenuComponent, NavMenuComponent, MatSidenavModule],

  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
}
