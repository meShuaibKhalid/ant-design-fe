import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from './shared/services/store.service';
import { Loader } from './shared/services/loader.service';
import { Observable, delay, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: {
    name: string;
    role: string;
    email: string;
  } = {
    name: 'Admin',
    role: 'normal_user',
    email: 'XXXXXXXXXXXXXXX',
  };
  spinner$ = new Observable<boolean>();
  viewType = 'user';
  constructor(
    private router: Router,
    private store: StoreService,
    private loader: Loader
  ) {
    store.state.subscribe(({ user }) => {
      this.user = user;
    });
    this.spinner$ = loader.state$.pipe(
      delay(500),
      map((state) => state)
    );
  }

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
      this.store.setState({ user: this.user });
    }
    this.viewType = localStorage.getItem('viewType') || 'user';
  }
}
