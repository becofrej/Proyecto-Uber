import { Preferences } from '@capacitor/preferences';  // Importamos el plugin Preferences
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/user/usuario.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

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
    password: new FormControl('', [Validators.required]),
  });

  imagen: any;
  token: string = '';
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private usuarioService: UsuarioService,
    private helper: HelperService,
    private storage: StorageService
  ) { }

  ngOnInit() { }

  async submit() {
    if (this.isSubmitting) {
      console.log('Proceso de registro en curso, por favor espera...');
      return;
    }

    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.isSubmitting = true;
      const loader = await this.helper.showLoader("Cargando...");

      try {
        const userFirebase = await this.firebase.registro(this.form.value.email, this.form.value.password);
        const token = await userFirebase.user?.getIdToken();

        if (token) {
          this.token = token;

          const req = await this.usuarioService.agregarUsuario({
            p_correo_electronico: this.form.value.email,
            p_nombre: this.form.value.name,
            p_telefono: this.form.value.phone,
            token: this.token
          }, this.imagen).toPromise();

          // Si el usuario fue agregado correctamente en la API
          if (req && req.message === 'Usuario agregado correctamente!') {

            // Guardamos los datos del usuario en Preferences
            await Preferences.set({
              key: 'user',
              value: JSON.stringify({
                name: this.form.value.name,
                email: this.form.value.email,
                phone: this.form.value.phone,
                image: this.imagen ? this.imagen.src : null 
              })
            });

            const jsonToken = [
              {
                "token": this.token,
                "usuario_correo": this.form.value.email
              }
            ];

            await this.storage.agregarToken(jsonToken);

            const formData = this.form.value;
            console.log('Datos del usuario en formato JSON:', JSON.stringify(formData));

            await this.helper.showAlert("Usuario registrado correctamente.", "Información");
            this.router.navigate(['/auth']);
          } else {
            console.error('La API no devolvió los datos esperados:', req);
            await this.helper.showAlert("Error al registrar el usuario. Por favor, intente nuevamente.", "Error");
          }

        } else {
          console.log('No se obtuvo el token de Firebase.');
          await this.helper.showAlert('Error al obtener el token de autenticación.', 'Error');
        }

      } catch (error: any) {
        console.error('Error durante el registro:', error);

        let msg = "Ocurrió un error durante el registro.";
        if (error.code === "auth/email-already-in-use") {
          msg = "El correo ya está registrado.";
        } else if (error.code === "auth/weak-password") {
          msg = "La contraseña es muy débil.";
        }

        await this.helper.showAlert(msg, "Error");

      } finally {
        this.isSubmitting = false;
        loader.dismiss();
      }
    } else {
      console.log('Formulario inválido. Por favor revise los campos.');
    }
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    if (image.webPath) {
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.imagen = {
        fname: 'foto.' + image.format,
        src: image.webPath,
        file: blob
      };
    }
  }
}
