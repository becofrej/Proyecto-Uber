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
  vehiculos: any[] = []; // Array para almacenar todos los vehículos
  filteredVehiculos: any[] = []; // Array para almacenar los vehículos filtrados
  searchUserId: number | null = null; // ID de usuario para buscar

  constructor(
    private router: Router,
    private vehiculoService: VehiculoService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const token = await this.storageService.getItem('token');

    if (token) {
      // Llama a obtenerTodosLosVehiculos para obtener todos los vehículos de todos los usuarios
      this.vehiculoService.obtenerTodosLosVehiculos(token).then(
        (response) => {
          this.vehiculos = response.data;  // Asigna todos los vehículos obtenidos
          this.filteredVehiculos = this.vehiculos; // Inicialmente muestra todos los vehículos
        },
        (error) => {
          console.error('Error al obtener los vehículos:', error);
        }
      );
    } else {
      console.log('No se encontró el token.');
    }
  }

  // Método para filtrar vehículos por ID de usuario
  filterVehiclesByUserId() {
    if (this.searchUserId) {
      this.filteredVehiculos = this.vehiculos.filter(
        (vehiculo) => vehiculo.id_usuario === this.searchUserId
      );
    } else {
      this.filteredVehiculos = this.vehiculos; // Muestra todos si no hay ID ingresado
    }
  }

  goAddCar() {
    this.router.navigate(['/main/add-car']);
  }
}
