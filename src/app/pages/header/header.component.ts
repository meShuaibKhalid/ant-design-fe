import { Component, Input } from '@angular/core';
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
  @Input() isAdmin;
  user: any;
  validateForm: FormGroup<{
    search: FormControl<string>;
  }> = this.fb.group({
    search: [''],
  });
  viewType: string  = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private store: StoreService,
    private router: Router
  ) {
    this.store.state.subscribe(({ user }) => {
      this.user = user;
    });
    this.viewType = localStorage.getItem('viewType');
  }

  onSearch() {
    this.router.navigate(['/cars'], {
      queryParams: {
        model: this.validateForm.value.search,
      },
    });
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
