import { Component } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Subject, pipe, takeUntil } from 'rxjs';

export interface User {
  _id: string;
  title: string;
  fullname: string;
  email: string;
  is_active: boolean;
  role: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[] = [];
  isVisible = false;
  editId!: string;
  userID = false;
  private ngDestroy$ = new Subject<void>();
  validateForm: FormGroup<{
    title: FormControl<string>;
    fullname: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    title: [''],
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private apiService: ApiService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService
      .userList()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((users: any) => {
        this.users = users;
      });
  }

  deleteRow(id: string) {
    this.apiService
      .deleteUser(id)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.getUsers();
      });
  }

  editRow(user: User) {
    this.editId = user._id;
    this.userID = true;
    this.validateForm.patchValue(user);
    this.validateForm.get('password')?.clearValidators();
    this.validateForm.updateValueAndValidity();
    this.showModal();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.userID) {
      this.apiService
        .updateUser(this.validateForm.value, this.editId)
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe(() => {
          this.getUsers();
        });
    } else {
      this.apiService
        .registerUser(this.validateForm.value)
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe(() => {
          this.getUsers();
        });
    }
    this.isVisible = false;
    this.userID = false;
  }

  handleCancel(): void {
    this.validateForm.reset();
    this.validateForm.updateValueAndValidity();
    this.isVisible = false;
    this.userID = false;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
