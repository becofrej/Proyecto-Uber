import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
  vehiculos: any[] = [];

  constructor(
    private router: Router,
    private vehiculoService: VehiculoService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const token = await this.storageService.getItem('token');

    if (token) {
      this.vehiculoService.obtenerTodosLosVehiculos(token).then(
        (response) => {
          this.vehiculos = response.data;
        },
        (error) => {
          console.error('Error al obtener los vehículos:', error);
        }
      );
    } else {
      console.log('No se encontró el token.');
    }
  }

  goAddCar() {
    this.router.navigate(['/main/add-car']);
  }
}
