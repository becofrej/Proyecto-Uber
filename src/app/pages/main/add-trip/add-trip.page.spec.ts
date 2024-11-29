import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { AddTripPage } from './add-trip.page';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/storage.service';
import { of } from 'rxjs';

describe('AddTripPage', () => {
  let component: AddTripPage;
  let fixture: ComponentFixture<AddTripPage>;
  let mockViajeService: jasmine.SpyObj<ViajeService>;
  let mockStorageService: jasmine.SpyObj<StorageService>;
  let toastController: jasmine.SpyObj<ToastController>;

  beforeEach(async () => {
    mockViajeService = jasmine.createSpyObj('ViajeService', ['agregarViaje']);
    mockStorageService = jasmine.createSpyObj('StorageService', ['getItem']);
    toastController = jasmine.createSpyObj('ToastController', ['create']);

    mockViajeService.agregarViaje.and.returnValue(
      Promise.resolve({ message: 'Viaje agregado correctamente' })
    );

    mockStorageService.getItem.and.callFake((key: string) => {
      if (key === 'token') return Promise.resolve('mockToken');
      if (key === 'usuarioCompleto')
        return Promise.resolve(JSON.stringify({ id_usuario: 123 }));
      return Promise.resolve(null);
    });

    toastController.create.and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
      } as any)
    );

    await TestBed.configureTestingModule({
      declarations: [AddTripPage],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
        IonicModule.forRoot(),
      ],
      providers: [
        { provide: ViajeService, useValue: mockViajeService },
        { provide: StorageService, useValue: mockStorageService },
        { provide: ToastController, useValue: toastController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add a trip if the form is invalid', async () => {
    component.tripForm.reset();

    await component.agregarViaje('', '', 0);

    expect(mockViajeService.agregarViaje).not.toHaveBeenCalled();
  });

  it('should add a trip', async () => {
    await component.ngOnInit();

    component.tripForm.setValue({
      origen: 'DUOC: San Joaquin',
      destino: 'Casa',
      costo: 10000,
      vehiculo_id: 47,
    });

    await component.agregarViaje('DUOC: San Joaquin', 'Casa', 47);

    expect(mockViajeService.agregarViaje).toHaveBeenCalledWith({
      p_id_usuario: 123,
      p_ubicacion_origen: 'DUOC: San Joaquin',
      p_ubicacion_destino: 'Casa',
      p_costo: 10000,
      p_id_vehiculo: 47,
      token: 'mockToken',
    });

    expect(toastController.create).toHaveBeenCalled();
  });
});
