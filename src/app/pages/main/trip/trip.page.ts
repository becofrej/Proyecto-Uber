import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  items: string[] = [];

  constructor(private router: Router) { }

  goAddTrip() {
    this.router.navigate(['/main/add-trip']);
  }


  ngOnInit() {
    for (let i = 1; i < 11; i++) {
      this.items.push(`Viaje ${i}`)
    }
  }

}
