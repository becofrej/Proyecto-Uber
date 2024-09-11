import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'vehiculo-page',
    loadChildren: () => import('./pages/vehiculo-page/vehiculo-page.module').then( m => m.VehiculoPagePageModule)
  },
  {
    path: 'viaje-page',
    loadChildren: () => import('./pages/viaje-page/viaje-page.module').then( m => m.ViajePagePageModule)
  },
  {
    path: 'new-viaje',
    loadChildren: () => import('./pages/new-viaje/new-viaje.module').then( m => m.NewViajePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
