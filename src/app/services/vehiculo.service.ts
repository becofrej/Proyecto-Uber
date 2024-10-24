import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private apiUrl = 'https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api';  // Ajusta tu URL base sin la barra al final

  constructor(private http: HttpClient) { }

  // Servicio para agregar un vehículo
agregarVehiculo(data: any, imageFile: any) {
  const formData = new FormData();
  formData.append('p_id_usuario', data.p_id_usuario);  // Enviar el userId
  formData.append('p_patente', data.p_patente);
  formData.append('p_marca', data.p_marca);
  formData.append('p_modelo', data.p_modelo);
  formData.append('p_anio', data.p_anio);
  formData.append('p_color', data.p_color);
  formData.append('p_tipo_combustible', data.p_tipo_combustible);
  formData.append('token', data.token);

  if (imageFile) {
    formData.append('image', imageFile.file, imageFile.fname);  // Enviar la imagen si está disponible
  }

  return this.http.post(`${this.apiUrl}/vehiculo/agregar`, formData).toPromise()
    .catch(error => {
      console.error('Error durante el registro del vehículo:', error);
      if (error.error) {
        console.log('Respuesta del servidor:', error.error);  // Muestra el cuerpo del error si está disponible
      }
      throw error;
    });
}
}