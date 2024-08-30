import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPagePageRoutingModule } from './perfil-page-routing.module';

import { PerfilPagePage } from './perfil-page.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPagePageRoutingModule,
    SharedModule
],
  declarations: [PerfilPagePage]
})
export class PerfilPagePageModule {}
