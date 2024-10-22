import { Storage } from './../../../../node_modules/@angular/fire/storage/storage.d';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/user/usuario.service';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserModel } from 'src/app/models/usuario';
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
  });
  
  token: string = '';  // Almacenar el token de Firebase
  usuario: UserModel[] = [];   // Datos del usuario desde la API

  constructor(
    private router: Router,
    private firebase: FirebaseService,  
    private helper: HelperService,     
    private storage: StorageService,
    private usuarioService: UsuarioService  // Servicio de la API REST
  ) { }

  ngOnInit() {}

  // Función para manejar el login
  async login() {
    this.form.markAllAsTouched();  // Marcar todos los campos como tocados para validar

    if (this.form.valid) {
      const loader = await this.helper.showLoader("Cargando...");

      try {
        // Realizar el login con Firebase
        const reqFirebase = await this.firebase.login(this.form.value.email, this.form.value.password);
        const token = await reqFirebase.user?.getIdToken();

        if (token) {
          this.token = token;

          // Realizar la solicitud para obtener el usuario desde la API REST usando el token
          const req = await this.usuarioService.obtenerUsuario({
            p_correo: this.form.value.email,
            token: this.token
          });

          this.usuario = req.data;  // Almacenar los datos del usuario
          console.log("Datos del usuario", this.usuario[0].id_usuario);

          // Guardar el token y los datos del usuario en el almacenamiento local
          const jsonToken = [
            {
              "token": this.token,
              "usuario_id": this.usuario[0].id_usuario,
              "usuario_correo": this.usuario[0].correo_electronico
            }
          ];

          await this.storage.agregarToken(jsonToken);  // Guardar el token y usuario

          // Navegar a la página principal
          this.router.navigateByUrl("/main/home");

          // Mostrar mensaje de éxito
          await this.helper.showAlert("Inicio de sesión exitoso", "Bienvenido");
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

  // Redirigir a la vista de Home
  goToHome() {
    const email = this.form.controls.email.value;
    this.router.navigate(['/main/home'], {queryParams: {email: email} });
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