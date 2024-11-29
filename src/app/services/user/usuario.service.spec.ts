import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar el módulo de pruebas HTTP

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Incluir el módulo HTTP
    });
    service = TestBed.inject(UsuarioService); // Inyectar el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verificar que el servicio se crea correctamente
  });
});
