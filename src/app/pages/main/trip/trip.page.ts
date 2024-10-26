import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  viajes: any[] = [];
  userId: number;
  token: string;

  constructor(
    private router: Router,
    private viajeService: ViajeService,
    private storage: StorageService
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
    if (this.userId && this.token) {
      this.viajeService.obtenerViajesPorUsuario(this.userId, this.token).subscribe(
        (response) => {
          if (response && response.data) {
            this.viajes = response.data;
          } else {
            console.log('No se encontraron viajes para el usuario');
          }
        },
        (error) => {
          console.error('Error al obtener los viajes:', error);
        }
      );
    }
  }

  goAddTrip() {
    this.router.navigate(['/main/add-trip']);
  }
}
