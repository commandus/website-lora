import { SendMessageResponse } from '../model/sendmessageresponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  subscruptionUrl = '/subscription';
  userId = 42;

  constructor(
    private http: HttpClient
    ) {
  }

  addPushSubscriber(sub: PushSubscription): Observable<any> {
    return this.http.put<number>(this.subscruptionUrl
      + '?uid=' + this.userId, sub);
  }

  rmPushSubscriber(subscriptionId: number) {
    return this.http.delete<boolean>(this.subscruptionUrl + '?id=' + subscriptionId );
  }

  // reserved
  sendMessage(msg: string): Observable<SendMessageResponse> {
    return this.http.post<SendMessageResponse>(this.subscruptionUrl + '?to=' + this.userId, msg);
  }
  
}
