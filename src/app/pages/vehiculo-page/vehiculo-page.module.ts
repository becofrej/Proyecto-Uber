import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculoPagePageRoutingModule } from './vehiculo-page-routing.module';

import { VehiculoPagePage } from './vehiculo-page.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculoPagePageRoutingModule,
    SharedModule
],
  declarations: [VehiculoPagePage]
})
export class VehiculoPagePageModule {}
