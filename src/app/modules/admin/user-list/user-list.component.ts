import { Component } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Loader } from '../../../shared/services/loader.service';

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
  isEdit = false;
  public ngDestroy$: Subject<boolean> = new Subject();
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
    private fb: NonNullableFormBuilder,
    private loader: Loader
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loader.show();
    this.apiService
      .userList()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((users: any) => {
        this.users = users;
        this.loader.hide();
      });
  }

  deleteRow(id: string) {
    this.loader.show();

    this.apiService
      .deleteUser(id)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.getUsers();
        this.loader.hide();
      });
  }

  editRow(user: User) {
    this.editId = user._id;
    this.isEdit = true;
    this.validateForm.patchValue(user);
    this.validateForm.get('password')?.clearValidators();
    this.validateForm.updateValueAndValidity();
    this.showModal();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.loader.show();
    if (this.isEdit) {
      this.apiService
        .updateUser(this.validateForm.value, this.editId)
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe(() => {
          this.loader.hide();
          this.getUsers();
        });
    } else {
      this.apiService
        .registerUser(this.validateForm.value)
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe(() => {
          this.loader.hide();
          this.getUsers();
        });
    }
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.isEdit = false;
    this.getUsers();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.validateForm.reset();
    this.validateForm.updateValueAndValidity();
    this.isVisible = false;
    this.isEdit = false;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }
}
