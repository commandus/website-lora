import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { EnvService } from '../../svc/env';
import { SubscriptionService } from '../../svc/subscription.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  templateUrl: './subscribe.component.html',
  imports: [MatSlideToggle],
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  constructor(
    private swPush: SwPush,
    public env: EnvService,
    private subsciptionService: SubscriptionService
  ) {}


  get checked(): boolean {
    return this.env.webPushSubscription.id > 0;
  }

  set checked(value: boolean) {
    if (value) {
      this.subscribeToNotifications();
    } else {
      this.unsubscribeToNotifications();
    }
  }

  public onToggle(toggle: MatSlideToggle) {
    this.checked = toggle.checked;
  }

  subscribeToNotifications() {
    console.log('subscribeToNotifications("' + this.env.VAPID_PUBLIC_KEY + '")...');
    this.swPush.requestSubscription( {
        serverPublicKey: this.env.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      this.subsciptionService.addPushSubscriber(sub).subscribe(
        subscription => {
          if (typeof subscription.endpoint === 'undefined') {
            console.error('Subscribe error', subscription);
          } else {
            this.env.webPushSubscription.assign(subscription);
            console.log('subscribeToNotifications => {id: ' + subscription.id + ', endpoint:' + subscription.endpoint + '}');
          }
        }
      );
    }
    )
    .catch(err => {
      console.error('Unsubscribe error', err);
    });
  }

  unsubscribeToNotifications() {
    this.swPush.unsubscribe()
    .then(sub => this.subsciptionService.rmPushSubscriber(this.env.webPushSubscription.id).subscribe(
      r => {
        this.env.webPushSubscription.reset();
      }
  ))
    .catch(err => console.error('Unsubscribe error', err));
  }

}
