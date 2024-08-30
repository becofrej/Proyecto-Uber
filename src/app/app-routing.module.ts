import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'perfil-page',
    loadChildren: () => import('./perfil-page/perfil-page.module').then( m => m.PerfilPagePageModule)
  },
  {
    path: 'vehiculo-page',
    loadChildren: () => import('./vehiculo-page/vehiculo-page.module').then( m => m.VehiculoPagePageModule)
  },
  {
    path: 'viaje-page',
    loadChildren: () => import('./viaje-page/viaje-page.module').then( m => m.ViajePagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
