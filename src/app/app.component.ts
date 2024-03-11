import { Component, HostBinding, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { EnvService } from '../svc/env';
import { OverlayContainer } from '@angular/cdk/overlay';

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
    return this.env.settings.darkMode ? 'dark' : 'light';
  }

  constructor(
    private env: EnvService
  ) {
    // @see https://thecodeshewrites.com/2021/06/16/angular-material-dark-light-theme/#htoc-theme-management-with-angular-material
    this.env.darkThemeOn(this.env.settings.darkMode);
  }
  
}
