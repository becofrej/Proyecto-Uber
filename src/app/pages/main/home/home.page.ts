import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route: ActivatedRoute) { }

  userEmail: string;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'];
      console.log('Correo del usuario: ', this.userEmail);
    })
  }


}
