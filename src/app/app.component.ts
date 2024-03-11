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

  public getDarkThemeOn($event: boolean) {
    this.env.settings.darkMode = $event;
    this.renderPageBodyColor();
    this.applyThemeToOverlyContainers();
  }

  constructor(
    private env: EnvService,
    private renderer: Renderer2,
    private overlayContainer: OverlayContainer
  ) {
    // @see https://thecodeshewrites.com/2021/06/16/angular-material-dark-light-theme/#htoc-theme-management-with-angular-material
    this.renderPageBodyColor();
    this.applyThemeToOverlyContainers();
  }
  
  private renderPageBodyColor() {
    this.renderer.removeClass(document.body, 'dark');
    this.renderer.removeClass(document.body, 'light');
    this.renderer.addClass(document.body, this.env.settings.darkMode ? 'dark' : 'light');
  }

private applyThemeToOverlyContainers() {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const classesToRemove = Array.from(overlayContainerClasses).filter(item => item.includes('app-theme-'));
    overlayContainerClasses.remove(...classesToRemove); 
    this.overlayContainer.getContainerElement().classList.add(this.env.settings.darkMode ? 'dark' : 'light');
  }

}
