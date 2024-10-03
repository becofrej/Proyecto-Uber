import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const llaveUber = "llaveAplicacionTeLlevo";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setItem(llave: string, valor: string) {
    await Preferences.set({key:llave, value:valor})
    
  }

}
