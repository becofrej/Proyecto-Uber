import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl = `${environment.apiUrl}/vehiculo`;

  constructor(private http: HttpClient) { }

  agregarVehiculo(data: any, imageFile: any): Observable<any> {
    const formData = new FormData();
    formData.append('p_id_usuario', data.p_id_usuario);
    formData.append('p_patente', data.p_patente);
    formData.append('p_marca', data.p_marca);
    formData.append('p_modelo', data.p_modelo);
    formData.append('p_anio', data.p_anio);
    formData.append('p_color', data.p_color);
    formData.append('p_tipo_combustible', data.p_tipo_combustible);
    formData.append('token', data.token);
  
    if (imageFile) {
      formData.append('image', imageFile.file, imageFile.fname);
    }
  
    console.log('Datos preparados para enviar:', formData);
  
    return this.http.post<any>(`${this.apiUrl}/agregar`, formData);
  }

  obtenerVehiculo(idVehiculo: number, token: string): Observable<EndPointVehiculo> {
    const params = new HttpParams()
      .set('id_vehiculo', idVehiculo.toString())
      .set('token', token);

    return this.http.get<EndPointVehiculo>(`${this.apiUrl}/obtener`, { params });
  }

   async obtenerTodosLosVehiculos(token: string): Promise<EndPointVehiculo> {
    try {
      const params = new HttpParams().set('token', token);
      const response = await lastValueFrom(
        this.http.get<EndPointVehiculo>(`${this.apiUrl}/obtener`, { params })
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

interface EndPointVehiculo {
  message: string;
  data: {
    id_vehiculo: number;
    patente: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    tipo_combustible: string;
    imagen_vehiculo: string;
    id_usuario: number;
    nombre: string;
    correo_electronico: string;
    telefono: string;
    imagen_usuario: string;
    nombre_proyecto: string;
  }[];
}
