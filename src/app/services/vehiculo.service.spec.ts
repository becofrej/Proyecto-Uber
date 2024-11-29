import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas HTTP
import { VehiculoService } from './vehiculo.service';

describe('VehiculoService', () => {
  let service: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Asegúrate de importar este módulo
      providers: [VehiculoService], // Proporciona el servicio a probar
    });
    service = TestBed.inject(VehiculoService); // Inyecta el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
