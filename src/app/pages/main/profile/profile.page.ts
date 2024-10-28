import { Preferences } from '@capacitor/preferences';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userName: string = 'Juanito Rodriguez';  
  userEmail: string = 'juanito.ro@gmail.com';  
  userPhone: string = '+56 9 00000000';  
  userImage: string = 'assets/icon/Perfil.png';  

  constructor() { }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'user' });
    if (value) {
      const user = JSON.parse(value);
      this.userName = user.name || this.userName; 
      this.userEmail = user.email || this.userEmail; 
      this.userPhone = user.phone || this.userPhone; 
      this.userImage = user.image || this.userImage; 
    }
  }
}
