import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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
