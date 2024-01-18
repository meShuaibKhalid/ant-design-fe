import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { UserListComponent } from '../user-list/user-list.component';
import { CarListingsComponent } from '../car-listings/car-listings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarDetailsComponent } from '../../../pages/car-details/car-details.component';
import { AppModule } from "../../../app.module";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'cars',
        component: CarListingsComponent,
      },
      {
        path: 'car-details/:id',
        component: CarDetailsComponent,
        data: {dashboard: true}
      }
    ],
  },
];

@NgModule({
    declarations: [
        DashboardComponent,
        WelcomeComponent,
        UserListComponent,
        CarListingsComponent,
    ],
    exports: [RouterModule],
    imports: [CommonModule, SharedModule, RouterModule.forChild(routes), ReactiveFormsModule]
})
export class DashboardModule {}
