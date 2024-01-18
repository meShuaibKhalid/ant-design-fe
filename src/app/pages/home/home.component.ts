import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Loader } from '../../shared/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  viewMore: boolean = false;
  validateForm: FormGroup<{
    name: FormControl<string>;
    year: FormControl<string>;
    price: FormControl<string>;
  }> = this.fb.group({
    name: [''],
    year: [''],
    price: [''],
  });
  cars = [];
  filteredCars: any[] = [];
  carsOnSale: any[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService,
    private loader: Loader
  ) {}

  ngOnInit() {
    this.getCars();
  }

  searchCars() {
    this.loader.show();
    const filters = {
      model: this.validateForm.value.name,
      year: this.validateForm.value.year,
      price: this.validateForm.value.price,
    };
    this.apiService.searchCars(filters).subscribe((res: any) => {
      this.loader.hide();
      this.cars = res;
      this.filteredCars = this.cars.slice(0, 4);
      this.carsOnSale = this.cars.filter((car: any) => car.sale);
    });
  }

  showMoreCars() {
    this.viewMore = !this.viewMore;
    this.filteredCars = this.viewMore ? this.cars : this.cars.slice(0, 4);
  }

  getCars() {
    this.loader.show();
    this.apiService.getallCars().subscribe((res: any) => {
      this.loader.hide();
      this.cars = res;
      this.filteredCars = this.cars.slice(0, 4);
      this.carsOnSale = this.cars.filter((car: any) => car.sale);
    });
  }
}
