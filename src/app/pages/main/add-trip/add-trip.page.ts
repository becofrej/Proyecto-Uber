import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationController, IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.page.html',
  styleUrls: ['./add-trip.page.scss'],
})
export class AddTripPage implements OnInit, AfterViewInit {

  @ViewChild(IonModal) modal: IonModal;
  tripForm: FormGroup;
  vehiculos = [
    { id: 1, nombre: 'Vehículo 1' },
    { id: 2, nombre: 'Vehículo 2' },
    { id: 3, nombre: 'Vehículo 3' }
  ];
  vehiculoSeleccionado: any = null;

  constructor(
    private animationCtrl: AnimationController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Inicialización del formulario con validación básica
    this.tripForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngAfterViewInit() {
    this.createScrollingTextAnimation();
  }

  // Animaciones reutilizables para el modal
  enterAnimation = (baseEl: HTMLElement) => {
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(baseEl.shadowRoot.querySelector('ion-backdrop'))
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(baseEl.shadowRoot.querySelector('.modal-wrapper'))
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => this.enterAnimation(baseEl).direction('reverse');

  // Abrir modal
  openModal() {
    this.modal.present();
  }

  // Cerrar modal
  closeModal() {
    this.modal.dismiss();
  }

  // Selección de vehículo
  selectVehiculo(vehiculo: any) {
    this.vehiculoSeleccionado = vehiculo;
    this.closeModal();
  }

  // Registro de viaje
  onSubmit() {
    if (this.tripForm.valid) {
      const viaje = {
        ...this.tripForm.value,
        vehiculo: this.vehiculoSeleccionado
      };
      console.log('Viaje registrado:', viaje);
      // Aquí puedes realizar una llamada a la API para guardar el viaje
    }
  }

  // Animación para el texto desplazándose en el panel publicitario
  createScrollingTextAnimation() {
    const scrollingText = document.querySelector('#scrolling-text');
    const animation = this.animationCtrl
      .create()
      .addElement(scrollingText)
      .duration(10000)  // Duración de la animación
      .iterations(Infinity)  // Repetición infinita
      .fromTo('transform', 'translateX(100%)', 'translateX(-100%)');  // Movimiento horizontal

    animation.play();
  }
}
