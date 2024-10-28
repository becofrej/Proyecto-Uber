import { Preferences } from '@capacitor/preferences';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  auth = getAuth();
  currentPath: string = '';

  constructor(private alertController: AlertController) {}

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.goAuth();
          }
        }
      ]
    });

    await alert.present();
  }

  async goAuth() {
    try {
      await Preferences.remove({ key: 'user' });
  
      await signOut(this.auth);
      console.log('Sesión cerrada exitosamente en Firebase');
  
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'user' });
    if (value) {
      const user = JSON.parse(value);
      this.userName = user.name;
      this.userImage = user.image || this.userImage;
    }

    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    });
  }
}
