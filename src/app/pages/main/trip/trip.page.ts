import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  viajes: any[] = [];
  filteredViajes: any[] = [];
  userId: number;
  token: string;
  nuevoEstado: number;
  viajeId: number;
  searchUserId: number | null = null;

  constructor(
    private router: Router,
    private viajeService: ViajeService,
    private storage: StorageService,
    private toastController: ToastController  // Inyectamos ToastController
  ) {}

  async ngOnInit() {
    await this.loadUserData();
    this.obtenerViajes();
  }

  async loadUserData() {
    this.token = await this.storage.getItem('token');
    const usuarioCompleto = await this.storage.getItem('usuarioCompleto');
    this.userId = usuarioCompleto ? JSON.parse(usuarioCompleto).id_usuario : null;
  }

  obtenerViajes() {
    if (this.token) {
      this.viajeService.obtenerTodosLosViajes(this.token).subscribe(
        (response) => {
          if (response && response.data) {
            this.viajes = response.data;
            this.filteredViajes = this.viajes;
          } else {
            console.log('No se encontraron viajes');
          }
        },
        (error) => {
          console.error('Error al obtener los viajes:', error);
        }
      );
    }
  }

  filterTripsByUserId() {
    if (this.searchUserId) {
      this.filteredViajes = this.viajes.filter(
        (viaje) => viaje.id_usuario === this.searchUserId
      );
    } else {
      this.filteredViajes = this.viajes;
    }
  }

  goAddTrip() {
    this.router.navigate(['/main/add-trip']);
  }

  async actualizarEstadoViaje() {
    try {
      const token = await this.storage.getToken();
      await this.viajeService.actualizarEstadoViaje(this.nuevoEstado, this.viajeId, token);
      console.log('Estado del viaje actualizado con éxito');
      this.mostrarMensajeActualizacionExito();  // Mostrar toast de éxito
      this.obtenerViajes(); // Refrescar la lista de viajes
    } catch (error) {
      console.error('Error al actualizar el estado del viaje:', error);
    }
  }

  async mostrarMensajeActualizacionExito() {
    const toast = await this.toastController.create({
      message: 'Estado del viaje actualizado con éxito',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}
