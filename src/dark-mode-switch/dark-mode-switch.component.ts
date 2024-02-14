import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dark-mode-switch',
  standalone: true,
  imports: [MatIcon, MatSidenav, MatSlideToggle],
  templateUrl: './dark-mode-switch.component.html',
  styleUrl: './dark-mode-switch.component.scss'
})
export class DarkModeSwitchComponent {
  @Input() sidenavHandle!: MatSidenav;
  @Output() darkThemeOn: EventEmitter<boolean> = new EventEmitter<boolean>();
  private darkThemeIcon = 'nightlight_round';
  private lightThemeIcon = 'wb_sunny';
  public lightDarkToggleIcon = this.darkThemeIcon;

  public doToggleLightDark(toggle: MatSlideToggle) {
    this.lightDarkToggleIcon = toggle.checked ? this.darkThemeIcon : this.lightThemeIcon;
    this.darkThemeOn.emit(!toggle.checked);
  }
}
