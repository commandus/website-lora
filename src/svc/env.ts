import { Injectable } from '@angular/core';
import { CalcService } from './calc.svc';
import { Platform } from '@angular/cdk/platform';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvService{
    public isOnline = false;
    private versionSubject = new BehaviorSubject<boolean>(false);
    public isNewVersion = this.versionSubject.asObservable();
    public modalPwaEvent: any;
    private pwaPlatformSubject = new BehaviorSubject<string>('');
    public pwaPlatform = this.pwaPlatformSubject.asObservable();
    public installed = false;

    constructor(
        public calc: CalcService,
        private platform: Platform,
        private swUpdate: SwUpdate
    ) {
        // this.calc.version().subscribe(v => this.version = v.version);
        this.isOnline = false;
  
        this.updateOnlineStatus();
        window.addEventListener('online',  this.updateOnlineStatus.bind(this));
        window.addEventListener('offline', this.updateOnlineStatus.bind(this));
      
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.pipe(
                filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
                map((evt: any) => {
                    this.versionSubject.next(true);
                }),
            );
        }
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

}
