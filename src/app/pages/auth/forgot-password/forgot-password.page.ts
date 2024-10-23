import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';  // Servicio para mostrar alertas

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private firebase: FirebaseService, private helper: HelperService) {}

  ngOnInit() {}

  async submit() {
    // Marcar el campo como tocado para mostrar los errores si los hay
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const loader = await this.helper.showLoader('Enviando solicitud...');
      try {
        await this.firebase.resetPassWord(this.form.value.email);
        await this.helper.showAlert('Se ha enviado un correo de recuperación de contraseña.', 'Recuperación de contraseña');
      } catch (error) {
        console.error('Error al enviar la solicitud de recuperación de contraseña:', error);
        await this.helper.showAlert('Ocurrió un error al intentar recuperar la contraseña. Inténtalo de nuevo.', 'Error');
      } finally {
        loader.dismiss();
      }
    } else {
      console.log('Formulario inválido. Por favor revise los campos.');
    }
  }
}