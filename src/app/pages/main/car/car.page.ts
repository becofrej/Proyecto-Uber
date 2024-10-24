import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
  items: string[] = [];

  constructor(private router: Router) { }

  goAddCar() {
    this.router.navigate(['/main/add-car']);
  }

  ngOnInit() {
    for (let i = 1; i < 11; i++) {
      this.items.push(`Vehículo ${i}`)
    }
  }

}
