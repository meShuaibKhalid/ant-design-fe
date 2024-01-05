import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  username = 'Saqib';
  validateForm: FormGroup<{
    search: FormControl<string>;
  }> = this.fb.group({
    search: [''],
  });

  constructor(private fb: NonNullableFormBuilder) {}

  onSearch() {}
}
