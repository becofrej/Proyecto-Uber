import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 

import { ViajeService } from './viaje.service';

describe('ViajeService', () => {
  let service: ViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()], 
    });
    service = TestBed.inject(ViajeService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });
});
