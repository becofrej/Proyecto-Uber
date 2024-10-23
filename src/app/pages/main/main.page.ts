import { Preferences } from '@capacitor/preferences';
import { getAuth, signOut } from 'firebase/auth';
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
  auth = getAuth(); // Inicializar Firebase Authentication
  currentPath: string = '';
  
  async goAuth() {
    // Limpiar cualquier dato almacenado en las preferencias locales
    await Preferences.clear();

    // Cerrar sesión en Firebase
    await signOut(this.auth)
      .then(() => {
        console.log('Sesión cerrada exitosamente en Firebase');
        // Redirigir al usuario a la página de autenticación
        this.router.navigate(['/auth']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión en Firebase:', error);
      });
  }
  
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    })

    }


}
