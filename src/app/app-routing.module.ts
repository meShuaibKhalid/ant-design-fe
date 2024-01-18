import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AiChatComponent } from './shared/components/ai-chat/ai-chat.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { UsedCarsComponent } from './pages/used-cars/used-cars.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'chat',
    component: AiChatComponent,
  },
  {
    path: 'car-details/:id',
    component: CarDetailsComponent
  },
  {
    path: 'cars',
    component: UsedCarsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }