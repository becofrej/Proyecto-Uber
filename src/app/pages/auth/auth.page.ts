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

  ngOnInit() {
  }

  // Modificación: pasar correo a la URL al redirigir
  goHome() {
    const email = this.form.controls.email.value;
    this.router.navigate(['/main/home'], { queryParams: { email: email } });
  }

  submit(){
    console.log(this.form.value);
    this.goHome();
  }

}
