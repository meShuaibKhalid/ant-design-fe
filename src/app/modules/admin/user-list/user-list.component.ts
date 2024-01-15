import { Component } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';

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
  public ngDestroy$:Subject<boolean>=new Subject();
  private httpSubscription$: Subscription[] = new Array<Subscription>();
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
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
   this.apiService.userList().pipe(takeUntil(this.ngDestroy$)).subscribe((users: any) => {
      console.log('users: ', users);
      this.users = users;
    });
  }

  deleteRow(id: string) {

    console.log('id: ', id);
    this.apiService.deleteUser(id).pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.getUsers();
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
    if (this.isEdit) {
     this.apiService.updateUser(this.validateForm.value, this.editId).pipe(takeUntil(this.ngDestroy$)).subscribe(() => {this.getUsers(); });
      
    }
    else {
     this.apiService.registerUser(this.validateForm.value).pipe(takeUntil(this.ngDestroy$)).subscribe(() => { this.getUsers(); });
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

  ngOnDestroy():void
  {
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
    
  }
}
