import { Geolocation } from '@capacitor/geolocation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';  

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentLocation: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  userEmail: string;

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'];
      console.log('Correo del usuario: ', this.userEmail)
    })

    // Establecemos una URL predeterminada para el mapa
    this.currentLocation = this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52018.62887805105!2d-71.69505781649906!3d-35.42595966105803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c6a2ac07d07d%3A0x265657feafdac8b8!2sTalca%2C%20Maule!5e0!3m2!1ses-419!2scl!4v1729197556863!5m2!1ses-419!2scl"
    );
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const latitude = coordinates.coords.latitude;
      const longitude = coordinates.coords.longitude;

      // Reemplazamos la URL del mapa por la ubicación actual del usuario
      this.currentLocation = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2scl`
      );

    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      // Si no se puede obtener la ubicación, seguimos mostrando el mapa predeterminado
    }
  }


}
