import { Preferences } from '@capacitor/preferences';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userName: string = 'Juanito Rodriguez';  // Valor por defecto si no se encuentran datos
  userEmail: string = 'Correo no disponible';  // Valor por defecto
  userPhone: string = 'Teléfono no disponible';  // Valor por defecto
  userImage: string = 'assets/icon/Perfil.png';  // Imagen por defecto

  constructor() { }

  async ngOnInit() {
    // Recuperar los datos del usuario desde Preferences
    const { value } = await Preferences.get({ key: 'user' });
    if (value) {
      const user = JSON.parse(value);
      this.userName = user.name || this.userName;  // Actualizar el nombre si está disponible
      this.userEmail = user.email || this.userEmail;  // Actualizar el email si está disponible
      this.userPhone = user.phone || this.userPhone;  // Actualizar el teléfono si está disponible
      this.userImage = user.image || this.userImage;  // Actualizar la imagen si está disponible
    }
  }
}
