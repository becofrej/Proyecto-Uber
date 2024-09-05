import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewVehiculoPage } from './new-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: NewVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewVehiculoPageRoutingModule {}
