import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

import { VehiculoService } from './vehiculo.service';

describe('VehiculoService', () => {
  let service: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()], 
    });
    service = TestBed.inject(VehiculoService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });
});
