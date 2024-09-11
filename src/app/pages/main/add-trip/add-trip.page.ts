import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatePickerModalComponent } from 'src/app/shared/components/date-picker-modal/date-picker-modal.component';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.page.html',
  styleUrls: ['./add-trip.page.scss'],
})
export class AddTripPage implements OnInit {
  loading = true;
  fechaInicio = '';
  fechaFin = '';
  currentDateField: string = '';

  constructor(private modalController: ModalController) {
        // Simulación de carga
        setTimeout(() => {
          this.loading = false;  // Cambia el estado de loading después de 3 segundos
        }, 3000);
   }

 // Abrir modal con el selector de fechas
 async openDatePicker(field: string) {
  this.currentDateField = field;

  const modal = await this.modalController.create({
    component: DatePickerModalComponent,  // Referencia al componente del modal
    componentProps: {
      selectedDate: this.currentDateField === 'inicio' ? this.fechaInicio : this.fechaFin
    }
  });

  // Escuchar el evento de cierre del modal
  modal.onDidDismiss().then((result) => {
    if (result.data) {
      if (this.currentDateField === 'inicio') {
        this.fechaInicio = result.data;
      } else if (this.currentDateField === 'fin') {
        this.fechaFin = result.data;
      }
    }
  });

  // Mostrar el modal
  return await modal.present();
}

  ngOnInit() {
  }

}
