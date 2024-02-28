import { Injectable } from '@angular/core';
import { CalcService } from './calc.svc';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';


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

    constructor(
        private swUpdate: SwUpdate,
        private platform: Platform,
        private snackbar: MatSnackBar,
        public calc: CalcService
    ) {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.pipe(
                filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
                map((evt: any) => {
                    console.info(`currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`);
                    const snack = this.snackbar.open('Доступна новая верcия', 'Обновить', {duration: 6000});
                    snack.onAction().subscribe(() => {
                        window.location.reload();
                        // this.swUpdate.activateUpdate();
                    });
            }));
        }
        
        this.swUpdate.checkForUpdate();

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

}
