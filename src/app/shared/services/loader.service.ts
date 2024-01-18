import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Loader {
  state$ = new BehaviorSubject(false);

  show() {
    this.state$.next(true);
  }

  hide() {
    this.state$.next(false);
  }
}
