import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/user/usuario.service';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
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
  token: string = '';
  usuarioCompleto: any = {};

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

  async login() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const loader = await this.helper.showLoader("Cargando...");
      try {
        const reqFirebase = await this.firebaseLogin();
        if (reqFirebase && reqFirebase.user) {
          const usuario = await this.fetchUserFromAPI();
          if (usuario) {
            this.goToHome(usuario.correo_electronico);
            await this.helper.showAlert("Inicio de sesión exitoso", "Bienvenido");
          }
        } else {
          await this.helper.showAlert('Error al obtener el token de autenticación.', 'Error');
        }
      } catch (error) {
        await this.handleLoginError(error);
      } finally {
        loader.dismiss();
      }
    }
  }
  
  async firebaseLogin() {
    const reqFirebase = await this.firebase.login(this.form.value.email, this.form.value.password);
    const token = await reqFirebase.user?.getIdToken();
    if (token) {
      this.token = token;
      await this.storage.setItem('token', this.token);
      console.log("Token de autenticación:", this.token);
      return reqFirebase;
    }
    return null;
  }

  async fetchUserFromAPI() {
    const req = await firstValueFrom(this.usuarioService.obtenerUsuario({
      p_correo: this.form.value.email,
      token: this.token
    }));
    if (req?.data?.length) {
      const usuario = req.data[0];
      this.usuarioCompleto = usuario;
      await this.storage.setItem('usuarioCompleto', JSON.stringify(usuario));
      console.log("Datos completos del usuario:", JSON.stringify(this.usuarioCompleto));
      return usuario;
    } else {
      console.error('No se encontraron los datos del usuario.');
      await this.helper.showAlert("Error al obtener los datos del usuario.", "Error");
    }
    return null;
  }

  goToHome(userEmail: string) {
    this.router.navigate(['/main/home'], { queryParams: { userEmail } });
  }

  goRegister() {
    this.router.navigate(['/auth/register']);
  }

  async handleLoginError(error: any) {
    const messages: { [key: string]: string } = {
      'auth/invalid-email': "Correo no válido.",
      'auth/wrong-password': "Contraseña incorrecta.",
      'auth/user-not-found': "El usuario no existe."
    };
    await this.helper.showAlert(messages[error.code] || "Ocurrió un error al iniciar sesión.", "Error");
  }
}