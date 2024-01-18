import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Loader } from '../../shared/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  validateForm: FormGroup<{
    title: FormControl<string>;
    fullname: FormControl<string>;
    email: FormControl<string>;
    // password: FormControl<string>;
    // confirmPassword: FormControl<string>;
  }> = this.fb.group({
    title: [''],
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    // password: ['', [Validators.required]],
    // confirmPassword: ['', [Validators.required]],
  });
  updatePassword = false;
  userID: string = '';

  constructor(
    private apiService: ApiService,
    private fb: NonNullableFormBuilder,
    private loader: Loader
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
      this.userID = user.id;
      this.getUser();
    }
  }

  onSubmit() {
    if (this.validateForm.valid) {
      this.loader.show();
      this.apiService
        .updateUser(this.validateForm.value, this.userID)
        .subscribe((res: any) => {
          this.loader.hide();
          this.validateForm.patchValue({
            title: res.title,
            fullname: res.fullname,
            email: res.email,
          });
        });
    }
  }

  getUser() {
    this.loader.show();
    this.apiService.getUserById(this.userID).subscribe((res: any) => {
      this.loader.hide();
      res = res[0];
      this.validateForm.patchValue({
        title: res.title,
        fullname: res.fullname,
        email: res.email,
      });
    });
  }
}
