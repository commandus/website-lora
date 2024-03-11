import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { CalcService } from './calc.svc';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from '../model/settings';
import { CheckForUpdateService } from './sw-update.svc';
import { OverlayContainer } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})
export class EnvService{
    private versionSubject = new BehaviorSubject<boolean>(false);
    private pwaPlatformSubject = new BehaviorSubject<string>('');
    public isOnline = false;
    public isNewVersion = this.versionSubject.asObservable();
    public modalPwaEvent: any;
    public pwaPlatform = this.pwaPlatformSubject.asObservable();
    public installed = false;

    public settings = new Settings(localStorage.getItem('settings'));

    private isNewAppAvailable: Subscription;
    private renderer: Renderer2;

    constructor(
        private platform: Platform,
        private snackbar: MatSnackBar,
        public calc: CalcService,
        private checkForUpdateService: CheckForUpdateService,
        private overlayContainer: OverlayContainer,
        private rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.isNewAppAvailable = checkForUpdateService.isAnyNewUpdateAvailable.subscribe((avail: boolean) => {
            if (!avail)
                return;
            const snack = this.snackbar.open('Доступна новая верcия', 'Обновить', {duration: 6000});
            snack.onAction().subscribe(() => {
                window.location.reload();
                // this.swUpdate.activateUpdate();
            });

        });

        this.isOnline = false;
        this.updateOnlineStatus();
        window.addEventListener('online',  this.updateOnlineStatus.bind(this));
        window.addEventListener('offline', this.updateOnlineStatus.bind(this));
        this.loadModalPwa();
    }
  
    private updateOnlineStatus(): void {
        this.isOnline = window.navigator.onLine;
    }

    // update actions

    public updateVersion(): void {
        this.versionSubject.next(false);
        window.location.reload();
    }

    public cancelUpdateVersion(): void {
        this.versionSubject.next(false);
    }

    private loadModalPwa(): void {
        window.addEventListener('appinstalled', () => {
            this.installed = true;
        });
        setTimeout(() => {
            if (this.installed)
                return;
            if (this.platform.ANDROID) {
                window.addEventListener('beforeinstallprompt', (event: any) => {
                    event.preventDefault();
                    this.modalPwaEvent = event;
                    this.pwaPlatformSubject.next('android');
                });
            }
        
            if (this.platform.IOS && this.platform.SAFARI) {
                const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
                if (!isInStandaloneMode) {
                    this.pwaPlatformSubject.next('ios');
                }
            }
        }, 5000);
    }
    
    public addPwaToHomeScreen(): void {
        this.modalPwaEvent.prompt();
        this.pwaPlatformSubject.next('');
    }
    
    public closePwa(): void {
        this.pwaPlatformSubject.next('');
    }

    public mtype2string(value: number): string
      {
      switch (value) {
        case 0:
            return "join-request";
        case 1:
            return "join-accept";
        case 2:
            return "unconfirmed-data-up";
        case 3:
            return "unconfirmed-data-down";
        case 4:
            return "confirmed-data-up";
        case 5:
            return "confirmed-data-down";
        case 6:
            return "rejoin-request";
        case 7:
            return "proprietary-radio";
        default:
            return "";
      }
    }

    public darkThemeOn(on: boolean) : void {
        this.settings.darkMode = on;
        this.settings.save();
        this.renderPageBodyColor();
        this.applyThemeToOverlayContainers();
    }

    private renderPageBodyColor() {
        this.renderer.removeClass(document.body, 'dark');
        this.renderer.removeClass(document.body, 'light');
        this.renderer.addClass(document.body, this.settings.darkMode ? 'dark' : 'light');
    }

    private applyThemeToOverlayContainers() {
        const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
        const classesToRemove = Array.from(overlayContainerClasses).filter(item => item.includes('app-theme-'));
        overlayContainerClasses.remove(...classesToRemove); 
        this.overlayContainer.getContainerElement().classList.add(this.settings.darkMode ? 'dark' : 'light');
    }
}
