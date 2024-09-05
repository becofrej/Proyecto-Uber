import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewVehiculoPageRoutingModule } from './new-vehiculo-routing.module';

import { NewVehiculoPage } from './new-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewVehiculoPageRoutingModule
  ],
  declarations: [NewVehiculoPage]
})
export class NewVehiculoPageModule {}
