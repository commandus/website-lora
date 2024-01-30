import { Component } from '@angular/core';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [TopMenuComponent, NavMenuComponent],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {

}
