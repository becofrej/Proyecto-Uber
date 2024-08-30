import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculoPagePage } from './vehiculo-page.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculoPagePageRoutingModule {}
