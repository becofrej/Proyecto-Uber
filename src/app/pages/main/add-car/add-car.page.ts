import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';  // Servicio de la API REST
import { Camera, CameraResultType } from '@capacitor/camera';  // Cámara de Capacitor
import { HelperService } from 'src/app/services/helper.service';  // Servicio de ayuda para alertas y loaders
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {
  loading = false;

  form = new FormGroup({
    patente: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    anio: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    tipo_combustible: new FormControl('', [Validators.required])
  });

  imagen: any;
  token: string = ''; 
  isSubmitting: boolean = false;

  constructor(
    private vehiculoService: VehiculoService,
    private helper: HelperService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit() {}

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
        const token = await this.storage.getItem('token');  // Usa el token de autenticación almacenado
        const userId = await this.storage.getUserId();  // Obtiene el userId del almacenamiento

        if (token && userId) {  // Verifica que tanto el token como el userId estén disponibles
          this.token = token;

          const formData = {
            p_id_usuario: userId,  // Agrega el userId al objeto formData
            p_patente: this.form.value.patente,
            p_marca: this.form.value.marca,
            p_modelo: this.form.value.modelo,
            p_anio: this.form.value.anio,
            p_color: this.form.value.color,
            p_tipo_combustible: this.form.value.tipo_combustible,
            token: this.token
          };

          if (this.imagen) {
            formData['image'] = this.imagen.file;  // Incluye la imagen si está disponible
          }

          // Envía los datos del vehículo a la API, pasando también la imagen
          const req: any = await this.vehiculoService.agregarVehiculo(formData, this.imagen);

          // Verifica la respuesta de la API
          if (req && typeof req === 'object') {
            console.log('Vehículo registrado correctamente');
            await this.helper.showAlert("Vehículo registrado correctamente.", "Información");
            this.router.navigate(['/main/car']);
          } else {
            console.error('La API no devolvió los datos esperados:', req);
            await this.helper.showAlert("Error al registrar el vehículo. Por favor, intente nuevamente.", "Error");
          }

        } else {
          console.log('No se obtuvo el token o el userId.');
          await this.helper.showAlert('Error al obtener el token o el userId.', 'Error');
        }

      } catch (error: any) {
        console.error('Error durante el registro del vehículo:', error);
        await this.helper.showAlert('Ocurrió un error durante el registro.', 'Error');

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