import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
    address: new FormControl('', [Validators.required, Validators.minLength(15)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      // El formulario es válido, imprimimos los datos en JSON
      const formData = this.form.value;
      console.log('Datos del usuario en formato JSON:', JSON.stringify(formData));

      this.router.navigate(['/auth'])
    } else {
      // El formulario no es válido, imprimimos los errores específicos
      console.log('El formulario no es válido. Errores:');
      Object.keys(this.form.controls).forEach(key => {
        const controlErrors = this.form.get(key)?.errors;
        if (controlErrors) {
          console.log(`Error en ${key}:`, controlErrors);
        }
      });
    }
  }
}
