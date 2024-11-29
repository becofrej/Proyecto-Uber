import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AddCarPage } from './add-car.page';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { of } from 'rxjs';
import { Camera } from '@capacitor/camera';

describe('AddCarPage', () => {
  let component: AddCarPage;
  let fixture: ComponentFixture<AddCarPage>;
  let mockVehiculoService: jasmine.SpyObj<VehiculoService>;
  let mockHelperService: jasmine.SpyObj<HelperService>;
  let mockStorageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

    mockVehiculoService = jasmine.createSpyObj('VehiculoService', [
      'agregarVehiculo',
    ]);
    mockHelperService = jasmine.createSpyObj('HelperService', [
      'showLoader',
      'showAlert',
    ]);
    mockStorageService = jasmine.createSpyObj('StorageService', ['getItem']);

    mockVehiculoService.agregarVehiculo.and.returnValue(
      of({ message: 'Vehículo registrado correctamente' })
    );
    mockHelperService.showLoader.and.returnValue(
      Promise.resolve({
        dismiss: jasmine.createSpy('dismiss'),
        present: jasmine.createSpy('present'),
      } as unknown as HTMLIonLoadingElement)
    );
    mockHelperService.showAlert.and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
      } as unknown as HTMLIonAlertElement)
    );
    mockStorageService.getItem.and.callFake((key: string) => {
      if (key === 'token') return Promise.resolve('mockToken');
      if (key === 'usuarioCompleto')
        return Promise.resolve(JSON.stringify({ id_usuario: 123 }));
      return Promise.resolve(null);
    });

    await TestBed.configureTestingModule({
      declarations: [AddCarPage],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        IonicModule.forRoot(),
      ],
      providers: [
        { provide: VehiculoService, useValue: mockVehiculoService },
        { provide: HelperService, useValue: mockHelperService },
        { provide: StorageService, useValue: mockStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form and register vehicle', async () => {
    component.form.setValue({
      patente: 'ABC123',
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: '2021',
      color: 'Rojo',
      tipo_combustible: 'Gasolina',
    });

    await component.submit();

    expect(mockVehiculoService.agregarVehiculo).toHaveBeenCalledWith(
      {
        p_id_usuario: 123,
        p_patente: 'ABC123',
        p_marca: 'Toyota',
        p_modelo: 'Corolla',
        p_anio: '2021',
        p_color: 'Rojo',
        p_tipo_combustible: 'Gasolina',
        token: 'mockToken',
      },
      component.imagen
    );
    expect(mockHelperService.showAlert).toHaveBeenCalledWith(
      'Vehículo registrado correctamente.',
      'Información'
    );
  });

  it('should not submit invalid form', async () => {
    component.form.reset();
    await component.submit();
    expect(mockVehiculoService.agregarVehiculo).not.toHaveBeenCalled();
  });

  it('should capture photo', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    const mockImage = {
      webPath: 'http://example.com/image.jpg',
      format: 'jpg',
      saved: true,
    };

    spyOn(Camera, 'getPhoto').and.returnValue(Promise.resolve(mockImage));
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(
        new Response(new Blob(['mock image content']), { status: 200 })
      )
    );

    console.log('Mocks configurados correctamente.');

    await component.takePhoto();

    console.log('Captura de foto completada, verificando resultados.');

    expect(component.imagen).toEqual({
      fname: 'foto.jpg',
      src: 'http://example.com/image.jpg',
      file: jasmine.any(Blob),
    });

    console.log('Prueba completada con éxito.');
  });
});
