import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
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

  constructor(
    private modalController: ModalController,
    private animationCtrl: AnimationController  // Inyectamos el controlador de animaciones
  ) {
    // Simulación de carga
    setTimeout(() => {
      this.loading = false;  // Cambia el estado de loading después de 3 segundos
    }, 3000);
  }

  // Animación para la apertura del modal (deslizar desde abajo)
  enterAnimation(baseEl: HTMLElement) {
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(baseEl.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(baseEl.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, transform: 'translateY(100%)', opacity: '0' },
        { offset: 1, transform: 'translateY(0)', opacity: '1' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  }

  // Animación para el cierre del modal (deslizar hacia abajo)
  leaveAnimation(baseEl: HTMLElement) {
    return this.enterAnimation(baseEl).direction('reverse');  // Simplemente invertimos la animación de apertura
  }

  // Abrir modal con el selector de fechas
  async openDatePicker(field: string) {
    this.currentDateField = field;

    const modal = await this.modalController.create({
      component: DatePickerModalComponent,  // Referencia al componente del modal
      componentProps: {
        selectedDate: this.currentDateField === 'inicio' ? this.fechaInicio : this.fechaFin,
      },
      enterAnimation: (baseEl) => this.enterAnimation(baseEl),  // Aplicar animación de entrada
      leaveAnimation: (baseEl) => this.leaveAnimation(baseEl),  // Aplicar animación de salida
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

  ngOnInit() {}
}
