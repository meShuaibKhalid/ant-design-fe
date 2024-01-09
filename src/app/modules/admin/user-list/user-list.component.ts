import { Component } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

interface User {
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
  isEdit = false;
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
    this.apiService.userList().subscribe((users: any) => {
      this.users = users;
    });
  }

  deleteRow(id: string) {
    console.log('id: ', id);
  }

  editRow(user: User) {
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
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.isEdit = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.validateForm.reset();
    this.validateForm.updateValueAndValidity();
    this.isVisible = false;
    this.isEdit = false;
  }
}
