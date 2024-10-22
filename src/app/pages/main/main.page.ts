import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  
  pages = [
    { title: 'Menú', url: '/main/home', icon: 'home-outline'},
    { title: 'Perfil', url: '/main/profile', icon: 'person-outline'},
    { title: 'Vehículos', url: '/main/car', icon: 'car-sport-outline'},
    { title: 'Viajes', url: '/main/trip', icon: 'airplane-outline'},
    { title: 'Configuración', url: '#', icon: 'settings-outline'},

  ]

  router = inject(Router);
  currentPath: string = '';
  
  async goAuth() {
    // Limpiar cualquier dato almacenado en las preferencias
    await Preferences.clear();

    // Redirigir al usuario a la página de autenticación
    this.router.navigate(['/auth']);
  }
  
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    })

    }


}
