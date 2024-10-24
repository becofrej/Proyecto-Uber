import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioService } from 'src/app/services/user/usuario.service';
import { firstValueFrom } from 'rxjs';
import { StorageService } from './storage.service';  // Asegúrate de incluir StorageService

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private fire: AngularFireAuth,
    private usuarioService: UsuarioService,
    private storage: StorageService  // Asegúrate de incluir StorageService aquí también
  ) { }

  async login(email: string, contrasena: string) {
    try {
      const userCredential = await this.fire.signInWithEmailAndPassword(email, contrasena);

      const token = await userCredential.user?.getIdToken();
      if (token) {
        const userInfo: any = await firstValueFrom(this.usuarioService.obtenerUsuario({
          p_correo: email,
          token: token
        }));

        if (userInfo && userInfo.data && userInfo.data.id_usuario) {
          // Guarda el userId en localStorage o en StorageService
          await this.storage.setUserId(userInfo.data.id_usuario);
          await this.storage.setItem('token', token);  // Guarda el token también
        }
      }

      return userCredential;
    } catch (error: any) {
      throw error;
    }
  }

  async registro(email: string, contrasena: string) {
    try {
      return await this.fire.createUserWithEmailAndPassword(email, contrasena);
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }

  async resetPassWord(email: string) {
    try {
      return await this.fire.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.fire.signOut();
      localStorage.removeItem('userId');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}