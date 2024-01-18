import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../../shared/services/store.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isCollapsed = false;
  user:any;

  constructor(private router: Router, private store: StoreService) {
    this.store.state.pipe(
      tap(({ user }) => {
        this.user = user;
      })
    );
   }

   setView(viewType: string) {
    localStorage.setItem('viewType', viewType);
  }

  logout() {
    localStorage.clear();
    this.store.reset();
    this.router.navigate(['/login']);
  }
}
