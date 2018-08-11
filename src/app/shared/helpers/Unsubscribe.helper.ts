import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';


export abstract class UnsubscribeHelper implements OnDestroy {

  subscriptions: Subscription[] = [];

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

}
