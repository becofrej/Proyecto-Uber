import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CarPage } from './car.page';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { StorageService } from 'src/app/services/storage.service';
import { of } from 'rxjs';

describe('CarPage', () => {
  let component: CarPage;
  let fixture: ComponentFixture<CarPage>;
  let mockVehiculoService: jasmine.SpyObj<VehiculoService>;
  let mockStorageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    // Crear mocks para los servicios
    mockVehiculoService = jasmine.createSpyObj('VehiculoService', [
      'obtenerTodosLosVehiculos',
    ]);
    mockStorageService = jasmine.createSpyObj('StorageService', ['getItem']);

    // Configurar el mock de obtenerTodosLosVehiculos
    mockVehiculoService.obtenerTodosLosVehiculos.and.returnValue(
      Promise.resolve({
        message: 'success',
        data: [
          {
            id_vehiculo: 1,
            patente: 'XYZ123',
            marca: 'Toyota',
            modelo: 'Corolla',
            anio: 2021,
            color: 'Rojo',
            tipo_combustible: 'Gasolina',
            imagen_vehiculo: 'https://example.com/car.png',
            id_usuario: 123,
            nombre: 'Usuario Demo',
            correo_electronico: 'demo@example.com',
            telefono: '123456789',
            imagen_usuario: 'https://example.com/user.png',
            nombre_proyecto: 'Proyecto Demo',
          },
        ],
      })
    );

    // Configurar el mock de getItem
    mockStorageService.getItem.and.callFake((key: string) => {
      if (key === 'token') return Promise.resolve('mockToken');
      return Promise.resolve(null);
    });

    await TestBed.configureTestingModule({
      declarations: [CarPage],
      imports: [
        HttpClientTestingModule, // Para manejar solicitudes HTTP
        RouterTestingModule, // Para simular la navegación
        IonicModule.forRoot(), // Módulos de Ionic
      ],
      providers: [
        { provide: VehiculoService, useValue: mockVehiculoService }, // Mock del servicio de vehículos
        { provide: StorageService, useValue: mockStorageService }, // Mock del almacenamiento
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on init', async () => {
    await component.ngOnInit();
    expect(mockStorageService.getItem).toHaveBeenCalledWith('token');
    expect(mockVehiculoService.obtenerTodosLosVehiculos).toHaveBeenCalledWith(
      'mockToken'
    );
    expect(component.vehiculos.length).toBe(1);
    expect(component.vehiculos[0].marca).toBe('Toyota');
  });

  it('should navigate to add car page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goAddCar();
    expect(routerSpy).toHaveBeenCalledWith(['/main/add-car']);
  });
});
