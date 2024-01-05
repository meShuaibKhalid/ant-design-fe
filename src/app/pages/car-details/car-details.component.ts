import { Component } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {
  array = [1, 2, 3, 4];
  effect = 'scrollx';
}
