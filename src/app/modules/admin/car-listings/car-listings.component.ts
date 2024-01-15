import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { CAR_FEATURES } from '../../../shared/constants';
import { NzUploadFile } from 'ng-zorro-antd/upload';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export interface CarI {
  _id?: string;
  model: string;
  images: string[];
  description: string;
  year: number;
  mileage: number;
  price: number;
  sale: boolean;
  transmission: string;
  doors: number;
  fuelType: string;
  seats: number;
  engine: string;
  color: string;
  condition: string;
  features: string;
  safetyFeatures: string;
  entertainmentFeatures: string;
  exteriorFeatures: string;
  interiorFeatures: string;
}
@Component({
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrl: './car-listings.component.scss',
})
export class CarListingsComponent {
  cars: CarI[] = [];
  isVisible = false;
  editId!: string;
  isEdit = false;
  validateForm!: FormGroup;
  features: string[] = [];
  ngDestroy$ = new Subject<void>();

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService
  ) {}
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  ngOnInit(): void {
    this.initForm();
    this.getCars();
    this.features = CAR_FEATURES;
  }

  initForm() {
    this.validateForm = this.fb.group({
      model: ['', [Validators.required]],
      images: ['', [Validators.required]],
      description: ['', [Validators.required]],
      year: ['', [Validators.required]],
      mileage: ['', [Validators.required]],
      price: ['', [Validators.required]],
      sale: ['', [Validators.required]],
      transmission: ['', [Validators.required]],
      doors: ['', [Validators.required]],
      fuelType: ['', [Validators.required]],
      seats: ['', [Validators.required]],
      engine: ['', [Validators.required]],
      color: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      features: [[''], [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  getCars() {
    this.apiService
      .getallCars()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((cars: any) => {
        this.cars = cars;
      });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.validateForm.reset();
    this.validateForm.updateValueAndValidity();
    this.isVisible = false;
    this.isEdit = false;
  }

  handleOk(): void {
    if (this.isEdit) {
      this.apiService
        .updateCarData(this.validateForm.value, this.editId)
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe(() => {
          this.getCars();
        });
    } else {
      console.log('form values:', this.validateForm.value);
      // this.apiService
      //   .addCarData(this.validateForm.value)
      //   .pipe(takeUntil(this.ngDestroy$))
      //   .subscribe(() => {
      //     this.getCars();
      //   });
    }
    this.isVisible = false;
    this.isEdit = false;
  }

  deleteRow(id?: string) {
    this.apiService
      .deleteCarData(id!)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(() => {
        this.getCars();
      });
  }

  editRow(data: any) {
    this.editId = data._id;
    this.isEdit = true;
    this.validateForm.patchValue(data);
    this.validateForm.updateValueAndValidity();
    this.showModal();
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
