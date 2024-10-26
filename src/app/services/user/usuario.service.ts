import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  agregarUsuario(datosUsuario: dataBodyUsuario, imgFileUser: any): Observable<any> {
    const formData = new FormData();

    formData.append('p_nombre', datosUsuario.p_nombre);
    formData.append('p_correo_electronico', datosUsuario.p_correo_electronico);
    formData.append('p_telefono', datosUsuario.p_telefono);
    if (datosUsuario.token) {
      formData.append('token', datosUsuario.token);
    }

    formData.append('image_usuario', imgFileUser.file, imgFileUser.name);

    return this.http.post<any>(`${environment.apiUrl}/user/agregar`, formData);
  }

  obtenerUsuario(data: dataGetUser): Observable<{ message: string, data: UsuarioResponse[] }> {
    const params = {
      p_correo: data.p_correo,
      token: data.token
    };

    return this.http.get<{ message: string, data: UsuarioResponse[] }>(`${environment.apiUrl}/user/obtener`, { params });
  }
}

interface dataBodyUsuario {
  p_nombre: string;
  p_correo_electronico: string;
  p_telefono: string;
  token?: string;
}

interface dataGetUser {
  p_correo: string;
  token: string;
}

interface UsuarioResponse {
  id_usuario: number;
  nombre: string;
  correo_electronico: string;
  telefono: string;
  nombre_proyecto: string;
  imagen_usuario: string;
}
