import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {
  loading = true;

  constructor() {
    // Simulamos una carga de datos
    setTimeout(() => {
      this.loading = false;  // Cuando termine la "carga", quitamos el skeleton
    }, 3000);  // Cambia el tiempo según lo que desees
   }

  ngOnInit() {
  }

}
