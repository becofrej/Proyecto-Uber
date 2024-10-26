import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { StorageService } from 'src/app/services/storage.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.page.html',
  styleUrls: ['./add-trip.page.scss'],
})
export class AddTripPage implements OnInit, AfterViewInit {
  tripForm: FormGroup;
  ubicaciones: { nombre: string }[] = [];
  idUsuario: number;
  token: string;
  vehiculoId: number = 47;

  constructor(
    private animationCtrl: AnimationController,
    private fb: FormBuilder,
    private storage: StorageService,
    private viajeService: ViajeService
  ) {}

  async ngOnInit() {
    this.tripForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      costo: [10000, Validators.required],
      vehiculo_id: ['', Validators.required]
    });

    this.token = await this.storage.getItem('token') || '';
    const usuarioCompleto = await this.storage.getItem('usuarioCompleto');
    this.idUsuario = usuarioCompleto ? JSON.parse(usuarioCompleto).id_usuario : null;

    this.inicializarUbicaciones();
  }

  inicializarUbicaciones() {
    this.ubicaciones = [
      { nombre: 'DUOC: San Joaquin' },
      { nombre: 'Casa' },
      { nombre: 'Mall Costanera Center' },
      // Añade más ubicaciones según tus necesidades
    ];
  }

  async agregarViaje(origen: string, destino: string, vehiculo_id: number) {
    const viajeData = {
      p_id_usuario: this.idUsuario,
      p_ubicacion_origen: origen,
      p_ubicacion_destino: destino,
      p_costo: 10000,
      p_id_vehiculo: vehiculo_id,
      token: this.token,
    };

    try {
      const response = await this.viajeService.agregarViaje(viajeData);
      console.log("Viaje registrado correctamente:", response);
    } catch (error) {
      console.error("Error al registrar el viaje:", error);
    }
  }

  ngAfterViewInit() {
    this.createScrollingTextAnimation();
  }

  createScrollingTextAnimation() {
    const scrollingText = document.querySelector('#scrolling-text');
    const animation = this.animationCtrl
      .create()
      .addElement(scrollingText)
      .duration(10000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(100%)', 'translateX(-100%)');

    animation.play();
  }
}
