import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { BackButtonComponent } from '../components/back-button/back-button.component';

@NgModule({
  declarations: [BackButtonComponent],
  imports: [
    CommonModule,
    IonicModule  // Asegúrate de importar IonicModule aquí
  ],
  exports: [BackButtonComponent]
})
export class SharedModule {}
