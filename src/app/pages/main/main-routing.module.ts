import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'car',
        loadChildren: () => import('./car/car.module').then(m => m.CarPageModule)
      },
      {
        path: 'add-car',
        loadChildren: () => import('./add-car/add-car.module').then(m => m.AddCarPageModule)
      },
      {
        path: 'add-trip',
        loadChildren: () => import('./add-trip/add-trip.module').then(m => m.AddTripPageModule)
      },
      {
        path: 'trip',
        loadChildren: () => import('./trip/trip.module').then(m => m.TripPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }