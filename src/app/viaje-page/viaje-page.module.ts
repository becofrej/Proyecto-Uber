import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajePagePageRoutingModule } from './viaje-page-routing.module';

import { ViajePagePage } from './viaje-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajePagePageRoutingModule
  ],
  declarations: [ViajePagePage]
})
export class ViajePagePageModule {}
