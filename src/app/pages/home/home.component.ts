import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  viewMore: boolean = false;
  validateForm: FormGroup<{
    name: FormControl<string>;
    price: FormControl<string>;
    model: FormControl<string>;
    varient: FormControl<string>;
  }> = this.fb.group({
    name: [''],
    price: [''],
    model: [''],
    varient: [''],
  });
  carsDummyJson = [
    {
      car_make: 'Audi',
      car_model: '90',
      car_model_year: 1993,
      color: 'Violet',
      transmission: 'Manual',
      id: 1,
      image:
        'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?w=740&t=st=1704351850~exp=1704352450~hmac=7f7bf2c64ebb76820da057a975b6c934b845515b8d3dbe0310c2bf1c6a30ba65',
    },
    {
      car_make: 'Ram',
      car_model: '2500',
      car_model_year: 2011,
      color: 'Khaki',
      transmission: 'Manual',
      id: 2,
      image:
        'https://img.freepik.com/free-photo/white-sport-sedan-with-colorful-tuning-road_114579-5044.jpg?w=740&t=st=1704352407~exp=1704353007~hmac=58fbf926193c961ba64041080f67e8c48a4dc3d0282a6bfd697c97a47cdd772d',
    },
    {
      car_make: 'Mercedes-Benz',
      car_model: 'E-Class',
      car_model_year: 2006,
      color: 'Turquoise',
      transmission: 'Automatic',
      id: 3,
      image:
        'https://img.freepik.com/free-photo/silver-sedan-with-red-lights-parked-port_114579-4385.jpg?w=740&t=st=1704352502~exp=1704353102~hmac=64b17d272d1ac59a965aebf72dba38f6bc4945bc8291cfd105062fb70f42bcbc',
    },
    {
      car_make: 'Volkswagen',
      car_model: 'Golf',
      car_model_year: 1984,
      color: 'Green',
      transmission: 'Manual',
      id: 4,
      image:
        'https://img.freepik.com/premium-photo/close-up-suv-car-with-sport-modern-design-car-dealership_67092-423.jpg?w=740',
    },
    {
      car_make: 'Chevrolet',
      car_model: 'Express 3500',
      car_model_year: 2003,
      color: 'Khaki',
      transmission: 'Manual',
      id: 5,
      image:
        'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?w=740&t=st=1704351850~exp=1704352450~hmac=7f7bf2c64ebb76820da057a975b6c934b845515b8d3dbe0310c2bf1c6a30ba65',
    },
    {
      car_make: 'Chevrolet',
      car_model: 'G-Series G20',
      car_model_year: 1995,
      color: 'Mauv',
      transmission: 'Manual',
      id: 6,
      image:
        'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?w=740&t=st=1704351850~exp=1704352450~hmac=7f7bf2c64ebb76820da057a975b6c934b845515b8d3dbe0310c2bf1c6a30ba65',
    },
    {
      car_make: 'Volkswagen',
      car_model: 'GTI',
      car_model_year: 2005,
      color: 'Yellow',
      transmission: 'Manual',
      id: 7,
      image:
        'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?w=740&t=st=1704351850~exp=1704352450~hmac=7f7bf2c64ebb76820da057a975b6c934b845515b8d3dbe0310c2bf1c6a30ba65',
    },
    {
      car_make: 'Isuzu',
      car_model: 'Rodeo Sport',
      car_model_year: 2001,
      color: 'Crimson',
      transmission: 'Manual',
      id: 8,
      image:
        'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?w=740&t=st=1704351850~exp=1704352450~hmac=7f7bf2c64ebb76820da057a975b6c934b845515b8d3dbe0310c2bf1c6a30ba65',
    },
    {
      car_make: 'Ford',
      car_model: 'F150',
      car_model_year: 2009,
      color: 'Purple',
      transmission: 'Manual',
      id: 9,
      image:
        'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?w=740&t=st=1704351850~exp=1704352450~hmac=7f7bf2c64ebb76820da057a975b6c934b845515b8d3dbe0310c2bf1c6a30ba65',
    },
    {
      car_make: 'Subaru',
      car_model: 'Legacy',
      car_model_year: 1993,
      color: 'Pink',
      transmission: 'Automatic',
      id: 10,
      image:
        'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?w=740&t=st=1704351850~exp=1704352450~hmac=7f7bf2c64ebb76820da057a975b6c934b845515b8d3dbe0310c2bf1c6a30ba65',
    },
  ];
  carsJson: any[] = [];

  constructor(private fb: NonNullableFormBuilder) {
    this.carsJson = this.carsDummyJson.slice(0, 4);
  }

  searchCars() {}

  showMoreCars() {
    this.viewMore = !this.viewMore;

    this.carsJson = this.viewMore
      ? this.carsDummyJson
      : this.carsDummyJson.slice(0, 4);
  }
}
