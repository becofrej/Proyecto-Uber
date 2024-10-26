import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http: HttpClient) { }

  // Método para agregar viaje
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

  // Método para obtener viajes por usuario
  obtenerViajesPorUsuario(userId: number, token: string): Observable<EndPointViaje> {
    const params = new HttpParams()
      .set('p_id_usuario', userId.toString())
      .set('token', token);

    return this.http.get<EndPointViaje>(`${environment.apiUrl}/viaje/obtener`, { params });
  }
}

// Interfaces
interface bodyViaje {
  p_id_usuario: number;
  p_ubicacion_origen: string;
  p_ubicacion_destino: string;
  p_costo: number;
  p_id_vehiculo: number;
  token: string;
}

interface EndPointViaje {
  message: string;
  data: {
    id: number;
    id_usuario: number;
    id_vehiculo: number;
    ubicacion_origen: string;
    ubicacion_destino: string;
    fecha: Date;
    costo: number;
    nombre_proyecto: string;
    patente: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    tipo_combustible: string;
    capacidad_pasajeros: number;
    imagen_vehiculo: string;
  }[];
}
