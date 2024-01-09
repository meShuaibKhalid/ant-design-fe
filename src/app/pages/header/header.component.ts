import { Component } from '@angular/core';
import { FormGroup, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { StoreService } from '../../shared/services/store.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user: any;
  validateForm: FormGroup<{
    search: FormControl<string>;
  }> = this.fb.group({
    search: [''],
  });

  constructor(private fb: NonNullableFormBuilder, private store: StoreService, private router: Router) {
    this.store.state.subscribe(({ user }) => {
      this.user = user;
    });
  }

  onSearch() {}

  logout() {
    localStorage.clear();
    this.store.reset();
    this.router.navigate(['/login']);
  }
}
