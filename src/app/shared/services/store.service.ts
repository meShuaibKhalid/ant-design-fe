import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private state$ = new BehaviorSubject<any>({});
  readonly state = this.state$.asObservable();

  getState() {
    return this.state;
  }

  setState(data: any) {
    this.state$.next({ ...this.state$.value, ...data });
  }

  reset() {
    this.state$.next({});
  }
}
