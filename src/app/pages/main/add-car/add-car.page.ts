import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { HelperService } from 'src/app/services/helper.service';
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
  ) {}

  ngOnInit() {}

  async submit() {
    console.log('Submit iniciado');
  
    if (!this.form.valid || this.isSubmitting) {
      console.log('Formulario no válido o ya se está enviando');
      return;
    }
  
    const loader = await this.helper.showLoader('Cargando...');
    this.isSubmitting = true;
  
    try {
      const token = await this.storage.getItem('token') || '';
      const usuarioCompleto = await this.storage.getItem('usuarioCompleto');
      const userId = usuarioCompleto ? JSON.parse(usuarioCompleto).id_usuario : null;
  
      console.log('Token:', token, 'UserId:', userId);
  
      if (token && userId) {
        this.token = token;
        const formData = this.prepareFormData(userId);
  
        console.log('Datos enviados al servicio:', formData);
  
        this.vehiculoService.agregarVehiculo(formData, this.imagen).subscribe(
          async (response) => {
            console.log('Respuesta del servicio:', response);
            await this.helper.showAlert('Vehículo registrado correctamente.', 'Información');
            this.router.navigate(['/main/car']);
          },
          async (error) => {
            console.error('Error en el servicio:', error);
            await this.helper.showAlert('Error al registrar el vehículo.', 'Error');
          }
        );
      } else {
        console.error('Falta el token o el UserId');
        await this.helper.showAlert('No se pudo registrar el vehículo. Faltan datos del usuario.', 'Error');
      }
    } catch (error) {
      console.error('Error en submit:', error);
    } finally {
      this.isSubmitting = false;
      loader.dismiss();
    }
  }

  prepareFormData(userId: string) {
    return {
      p_id_usuario: userId,
      p_patente: this.form.value.patente,
      p_marca: this.form.value.marca,
      p_modelo: this.form.value.modelo,
      p_anio: this.form.value.anio,
      p_color: this.form.value.color,
      p_tipo_combustible: this.form.value.tipo_combustible,
      token: this.token
    };
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
      console.log('Imagen capturada:', this.imagen);
    }
  }
}