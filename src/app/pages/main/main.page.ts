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
  
  userId: string | null = null;
  userName: string = 'Usuario';
  userImage: string = 'assets/icon/Perfil.png';

  pages = [
    { title: 'Menú', url: '/main/home', icon: 'home-outline'},
    { title: 'Perfil', url: '/main/profile', icon: 'person-outline'},
    { title: 'Vehículos', url: '/main/car', icon: 'car-sport-outline'},
    { title: 'Viajes', url: '/main/trip', icon: 'airplane-outline'},
    { title: 'Configuración', url: '#', icon: 'settings-outline'},
  ];

  router = inject(Router);
  auth = getAuth(); // Inicializar Firebase Authentication
  currentPath: string = '';

  async goAuth() {
    try {
      // Limpiar solo los datos de usuario almacenados en Preferences (sin borrar todo)
      await Preferences.remove({ key: 'user' });
  
      // Cerrar sesión en Firebase
      await signOut(this.auth);
      console.log('Sesión cerrada exitosamente en Firebase');
  
      // Redirigir al usuario a la página de autenticación
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }  

  async ngOnInit() {
    // Recuperar los datos del usuario de Preferences
    const { value } = await Preferences.get({ key: 'user' });
    if (value) {
      const user = JSON.parse(value);
      this.userName = user.name;  // Actualizamos el nombre del usuario con los datos guardados
      this.userImage = user.image || this.userImage;  // Actualizar la imagen si está disponible
    }

    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    });
  }
}
