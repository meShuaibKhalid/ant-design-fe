import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unsubscription',
  standalone: true,
  imports: [],
  template: '',
})
export class UnsubscriptionComponent implements OnDestroy {
  private subscription$: Subscription[] = [];

  addSubscription(subscription: Subscription) {
    this.subscription$ = [...this.subscription$, subscription];
  }

  ngOnDestroy(): void {
    this.subscription$.forEach((subscription) => subscription.unsubscribe());
  }
}
