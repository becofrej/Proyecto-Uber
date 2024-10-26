import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http:HttpClient) { }


  async agregarViaje(data: bodyViaje) {
    try {
      const response = await lastValueFrom(
        this.http.post<any>(`${environment.apiUrl}/viaje/agregar`, data)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Definición de la interfaz bodyViaje para el método agregarViaje
interface bodyViaje {
  p_id_usuario: number;
  p_ubicacion_origen: string;
  p_ubicacion_destino: string;
  p_costo: number;
  p_id_vehiculo: number;
  token: string;
}
