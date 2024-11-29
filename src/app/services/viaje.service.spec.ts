import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Asegúrate de importar este módulo
import { ViajeService } from './viaje.service';

describe('ViajeService', () => {
  let service: ViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas HTTP
      providers: [ViajeService], // Proporciona el servicio a probar
    });
    service = TestBed.inject(ViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
