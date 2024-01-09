import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../shared/services/store.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  user: any = {};
  constructor(private store: StoreService) {
    this.store.state.subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnInit() {}
}
