import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) 
  },
  {
    path: 'perfil-page',
    loadChildren: () => import('./pages/perfil-page/perfil-page.module').then( m => m.PerfilPagePageModule)
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
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
