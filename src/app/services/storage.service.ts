import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const llaveUber = "llaveAplicacionUber";
const llaveUsuario = "userId";  // Llave para almacenar el ID de usuario

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Métodos para manejar items en general
  async setItem(llave: string, valor: string) {
    await Preferences.set({ key: llave, value: valor });
  }

  async getItem(llave: string): Promise<string | null> {
    const obj = await Preferences.get({ key: llave });
    return obj.value;
  }

  // Métodos específicos para manejar el token
  async agregarToken(dataJson: any) {
    await this.setItem(llaveUber, JSON.stringify(dataJson));
  }

  async obtenerStorage() {
    const storageData = await this.getItem(llaveUber);
    if (storageData == null) {
      return [];
    } else {
      return JSON.parse(storageData);
    }
  }

  // Métodos para manejar el userId en localStorage
  async setUserId(userId: string) {
    localStorage.setItem(llaveUsuario, userId);
  }

  async getUserId(): Promise<string | null> {
    return localStorage.getItem('userId');
  }

  async removeUserId() {
    localStorage.removeItem(llaveUsuario);
  }

}