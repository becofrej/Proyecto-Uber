import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajePagePage } from './viaje-page.page';

const routes: Routes = [
  {
    path: '',
    component: ViajePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajePagePageRoutingModule {}
