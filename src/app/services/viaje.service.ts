import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http: HttpClient) { }

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

  async actualizarEstadoViaje(p_id_estado: number, p_id: number, token: string): Promise<any> {
    const url = `https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api/viaje/actualiza_estado_viaje`;
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const body = {
      p_id_estado: p_id_estado,
      p_id: p_id,
      token: token
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el estado del viaje');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error actualizando el estado del viaje:', error);
      throw error;
    }
  }

  obtenerViajesPorUsuario(userId: number, token: string): Observable<EndPointViaje> {
    const params = new HttpParams()
      .set('p_id_usuario', userId.toString())
      .set('token', token);

    return this.http.get<EndPointViaje>(`${environment.apiUrl}/viaje/obtener`, { params });
  }

  obtenerTodosLosViajes(token: string): Observable<EndPointViaje> {
    const params = new HttpParams().set('token', token);
    return this.http.get<EndPointViaje>(`${environment.apiUrl}/viaje/obtener`, { params });
  }

}

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
