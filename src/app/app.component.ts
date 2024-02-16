import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ControlPanelComponent, TopMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @HostBinding('class')
  public get themeMode() {
    return this.darkMode ? 'dark-theme' : 'light-theme';
  }

  darkMode = false;
}
