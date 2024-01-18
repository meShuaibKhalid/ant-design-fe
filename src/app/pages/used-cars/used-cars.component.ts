import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '../../shared/services/loader.service';

@Component({
  selector: 'app-used-cars',
  templateUrl: './used-cars.component.html',
  styleUrl: './used-cars.component.scss',
})
export class UsedCarsComponent {
  cars = [];
  filteredCars: any[] = [];
  filters: any = {};
  viewMore: boolean = false;
  title = 'Used Cars';

  constructor(private apiService: ApiService, private router: ActivatedRoute, private loader: Loader) {
    this.router.queryParams.subscribe((params) => {
      if (params['used'] == 'true') {
        this.filters = { condition: 'Used' };
        this.getCars();
      } else if (params['sale'] == 'true') {
        this.title = 'Cars On Sale';
        this.filters = { sale: true };
        this.getCars();
      } else if (params['model']?.length) {
        this.title = 'Cars';
        this.filters = { model: params['model'] };
        this.searchCars();
      }
    });
  }

  ngOnInit() {}

  searchCars() {
    this.loader.show();
    this.apiService.searchCars(this.filters).subscribe((res: any) => {
      this.loader.hide();
      this.cars = res;
    });
  }

  showMoreCars() {
    this.viewMore = !this.viewMore;
    this.filteredCars = this.viewMore ? this.cars : this.cars.slice(0, 4);
  }

  getCars() {
    this.loader.show();
    this.apiService.getallCars(this.filters).subscribe((res: any) => {
      this.loader.hide();
      this.cars = res;
    });
  }
}
