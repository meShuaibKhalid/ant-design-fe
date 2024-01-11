import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { UnsubscriptionComponent } from '../../../shared/components/unsubscription/unsubscription.component';

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
export class CarListingsComponent extends UnsubscriptionComponent {
  cars: CarI[] = [];
  isVisible = false;
  editId!: string;
  isEdit = false;
  validateForm!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
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
      features: ['', [Validators.required]],
      safetyFeatures: ['', [Validators.required]],
      entertainmentFeatures: ['', [Validators.required]],
      exteriorFeatures: ['', [Validators.required]],
      interiorFeatures: ['', [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  getCars() {
    this.addSubscription(
      this.apiService.getallCars().subscribe((cars: any) => {
        this.cars = cars;
      })
    );
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.validateForm.reset();
    this.validateForm.updateValueAndValidity();
    this.isVisible = false;
    this.isEdit = false;
  }

  handleOk(): void {
    this.apiService.addCarData(this.validateForm.value).subscribe(() => {
      this.getCars();
    });
    this.isVisible = false;
    this.isEdit = false;
  }
}
