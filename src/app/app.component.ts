import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from './shared/services/store.service';

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

  constructor(private router: Router, private store: StoreService) {
    store.state.subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
      this.store.setState({ user: this.user });
    }
  }
}
