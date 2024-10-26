import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/user/usuario.service';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserModel } from 'src/app/models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  token: string = '';  // Almacenar el token de Firebase
  usuario: UserModel[] = [];   // Datos del usuario desde la API

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private firebase: FirebaseService,  
    private helper: HelperService,     
    private storage: StorageService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {}

  // Función para manejar el login
  async login() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const loader = await this.helper.showLoader("Cargando...");

      try {
        const reqFirebase = await this.firebase.login(this.form.value.email, this.form.value.password);
        const token = await reqFirebase.user?.getIdToken();

        if (token) {
          this.token = token;
          await this.storage.setItem('token', this.token);

          const req: any = await firstValueFrom(this.usuarioService.obtenerUsuario({
            p_correo: this.form.value.email,
            token: this.token
          }));

          if (req && req.data) {
            this.usuario = req.data;
            const userCorreo = this.usuario[0].correo_electronico;

            // Guardar el correo en el almacenamiento local
            await this.storage.setItem('userEmail', userCorreo);

            // Navegar a la página principal pasando el correo como parámetro de la URL
            this.goToHome(userCorreo);

            await this.helper.showAlert("Inicio de sesión exitoso", "Bienvenido");
          } else {
            console.error('No se encontraron los datos del usuario.');
            await this.helper.showAlert("Error al obtener los datos del usuario.", "Error");
          }
        } else {
          console.error('No se obtuvo el token.');
          await this.helper.showAlert('Error al obtener el token de autenticación.', 'Error');
        }

        loader.dismiss();

      } catch (error: any) {
        loader.dismiss();

        let msg = "Ocurrió un error al iniciar sesión.";
        if (error.code === "auth/invalid-email") {
          msg = "Correo no válido.";
        } else if (error.code === "auth/wrong-password") {
          msg = "Contraseña incorrecta.";
        } else if (error.code === "auth/user-not-found") {
          msg = "El usuario no existe.";
        }

        await this.helper.showAlert(msg, "Error");
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  // Redirigir a la vista de Home con el correo en la URL
  goToHome(userEmail: string) {
    this.router.navigate(['/main/home'], { queryParams: { userEmail: userEmail } });
  }
  
  // Redirigir a la vista de registro
  goRegister() {
    this.router.navigate(['/auth/register']);
  }

  // Función para mostrar el cargador
  async showLoader(message: string) {
    const loader = await this.helper.showLoader(message);
    return loader;
  }
}
