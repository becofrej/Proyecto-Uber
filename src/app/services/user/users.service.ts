import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  async agregarUsuario(datosUsuarios: dataBodyUsuario, imgFileUser:any){
    try {
      const formData = new FormData();

      formData.append('p_nombre', datosUsuarios.p_nombre);
      formData.append('p_correo', datosUsuarios.p_correo);
      formData.append('p_telefono', datosUsuarios.p_telefono);

      if (datosUsuarios.token){
        formData.append('token', datosUsuarios.token)
      }
      formData.append('image_user', imgFileUser.file, imgFileUser.name)
  
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'user/agregar', formData));
      return response;
      
    } catch (error) {
      throw (error);
    }
  }
}

interface dataBodyUsuario{
  p_nombre: string;
  p_correo: string;
  p_telefono: string;
  token?: string;
}
