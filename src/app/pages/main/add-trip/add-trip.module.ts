import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTripPageRoutingModule } from './add-trip-routing.module';

import { AddTripPage } from './add-trip.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTripPageRoutingModule,
    SharedModule
  ],
  declarations: [AddTripPage]
})
export class AddTripPageModule {}
