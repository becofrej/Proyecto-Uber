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
  vehiculos: any[] = []; // Array para almacenar todos los vehículos del usuario

  constructor(
    private router: Router,
    private vehiculoService: VehiculoService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const userIdString = await this.storageService.getUserId();
    const token = await this.storageService.getItem('token');

    if (userIdString && token) {
      const userId = Number(userIdString);
      
      // Llama a obtenerVehiculosPorUsuario para obtener todos los vehículos del usuario
      this.vehiculoService.obtenerVehiculosPorUsuario(token).then(
        (response) => {
          // Filtra todos los vehículos que corresponden al userId
          this.vehiculos = response.data.filter(
            (vehiculo) => vehiculo.id_usuario === userId
          );
        },
        (error) => {
          console.error('Error al obtener los vehículos:', error);
        }
      );
    } else {
      console.log('No se encontró el ID del usuario o el token.');
    }
  }

  goAddCar() {
    this.router.navigate(['/main/add-car']);
  }
}
