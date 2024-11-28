import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()], 
    });
    service = TestBed.inject(UsuarioService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });
});
