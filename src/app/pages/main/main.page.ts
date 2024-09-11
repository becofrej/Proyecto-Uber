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
    { title: 'Iniciar sesión', url: '/auth', icon: 'enter-outline'},


  ]

  goAuth() {
    this.router.navigate(['/auth']);
  }

  router = inject(Router);
  currentPath: string = '';
  

  
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    })

    }


}
