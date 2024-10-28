import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const llaveUber = "llaveAplicacionUber";
const llaveUsuario = "userId";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setItem(llave: string, valor: string) {
    await Preferences.set({ key: llave, value: valor });
  }

  async getItem(llave: string): Promise<string | null> {
    const obj = await Preferences.get({ key: llave });
    return obj.value;
  }

  async getToken() {
    return await this.getItem('token');
  }

  async getUserId(): Promise<string | null> {
    return localStorage.getItem(llaveUsuario);
  }

  async setUserId(userId: string) {
    localStorage.setItem(llaveUsuario, userId);
  }

  async removeUserId() {
    localStorage.removeItem(llaveUsuario);
  }
}
