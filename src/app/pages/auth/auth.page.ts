import { Storage } from './../../../../node_modules/@angular/fire/storage/storage.d';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router) { }

  goHome() {
    const email = this.form.controls.email.value;
    this.router.navigate(['/main/home'], { queryParams: { email: email } });
  }

  ngOnInit() {
  }

  submit(){
    if (this.form.valid) {
      this.goHome();
    } else {
      console.log('Formulario no válido');
    }
  }

}

  
