import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '../../shared/services/loader.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent {
  carDetails;
  isDashboard = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loader: Loader
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.route.data.subscribe((data) => {
      if (data['dashboard']) {
        this.isDashboard = true;
      }
    });
    this.getCarDetails(id);
  }

  getCarDetails(id: string) {
    this.loader.show();
    this.apiService.getCarById(id).subscribe(
      (res) => {
        this.carDetails = res;
        this.loader.hide();
      },
      (err) => {
        console.log(err);
        this.loader.hide();
      }
    );
  }
}
