import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { TripPage } from './trip.page';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';
import { of } from 'rxjs';

describe('TripPage', () => {
  let component: TripPage;
  let fixture: ComponentFixture<TripPage>;
  let mockViajeService: jasmine.SpyObj<ViajeService>;
  let mockStorageService: jasmine.SpyObj<StorageService>;
  let toastController: jasmine.SpyObj<ToastController>;

  beforeEach(async () => {
    // Crear mocks para los servicios
    mockViajeService = jasmine.createSpyObj('ViajeService', [
      'obtenerTodosLosViajes',
      'actualizarEstadoViaje',
    ]);
    mockStorageService = jasmine.createSpyObj('StorageService', [
      'getItem',
      'getToken',
    ]);
    toastController = jasmine.createSpyObj('ToastController', ['create']);

    // Configurar mocks para devolver valores simulados
    mockViajeService.obtenerTodosLosViajes.and.returnValue(
      of({
        message: 'success',
        data: [
          {
            id: 1,
            id_usuario: 123,
            id_vehiculo: 456,
            ubicacion_origen: 'A',
            ubicacion_destino: 'B',
            fecha: new Date(),
            costo: 10000,
            nombre_proyecto: 'Proyecto Demo',
            patente: 'XYZ123',
            marca: 'Toyota',
            modelo: 'Corolla',
            anio: 2021,
            color: 'Rojo',
            tipo_combustible: 'Gasolina',
            capacidad_pasajeros: 5,
            imagen_vehiculo: 'https://example.com/car.png',
          },
        ],
      })
    );

    mockViajeService.actualizarEstadoViaje.and.returnValue(
      Promise.resolve({ message: 'Estado actualizado correctamente' }) // Simulación del servicio
    );

    mockStorageService.getItem.and.callFake((key: string) => {
      if (key === 'token') return Promise.resolve('mockToken');
      if (key === 'usuarioCompleto')
        return Promise.resolve(JSON.stringify({ id_usuario: 123 }));
      return Promise.resolve(null);
    });

    mockStorageService.getToken.and.returnValue(Promise.resolve('mockToken')); // Simulación de getToken

    await TestBed.configureTestingModule({
      declarations: [TripPage],
      imports: [
        HttpClientTestingModule, // Para manejar solicitudes HTTP
        RouterTestingModule, // Para manejar navegación en pruebas
        IonicModule.forRoot(), // Módulos de Ionic
      ],
      providers: [
        { provide: ViajeService, useValue: mockViajeService }, // Usar el mock del servicio
        { provide: StorageService, useValue: mockStorageService }, // Usar el mock del almacenamiento
        { provide: ToastController, useValue: toastController }, // Usar el mock del ToastController
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', async () => {
    await component.loadUserData();
    expect(component.userId).toBe(123);
    expect(component.token).toBe('mockToken');
  });

  it('should fetch viajes and filter correctly', () => {
    component.obtenerViajes();
    expect(mockViajeService.obtenerTodosLosViajes).toHaveBeenCalledWith(
      'mockToken'
    );
    expect(component.viajes.length).toBe(1);

    // Test filtering by user ID
    component.searchUserId = 123;
    component.filterTripsByUserId();
    expect(component.filteredViajes.length).toBe(1);

    component.searchUserId = 456;
    component.filterTripsByUserId();
    expect(component.filteredViajes.length).toBe(0);
  });

  it('should navigate to add-trip page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goAddTrip();
    expect(routerSpy).toHaveBeenCalledWith(['/main/add-trip']);
  });

  it('should update the trip state', async () => {
    component.nuevoEstado = 2;
    component.viajeId = 1;

    await component.actualizarEstadoViaje();

    expect(mockViajeService.actualizarEstadoViaje).toHaveBeenCalledWith(
      2,
      1,
      'mockToken'
    );
  });
});
