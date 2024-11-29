import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { SignUpPage } from './sign-up.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/user/usuario.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let mockFirebaseService: jasmine.SpyObj<FirebaseService>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockHelperService: jasmine.SpyObj<HelperService>;
  let mockStorageService: jasmine.SpyObj<StorageService>;
  let mockAngularFireAuth: any;

  beforeEach(waitForAsync(() => {
    mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['registro']);
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['agregarUsuario']);
    mockHelperService = jasmine.createSpyObj('HelperService', ['showLoader', 'showAlert']);
    mockStorageService = jasmine.createSpyObj('StorageService', ['setItem']);

    mockFirebaseService.registro.and.returnValue(
      Promise.resolve({
        user: {
          getIdToken: () => Promise.resolve('mockToken'),
        },
        credential: {
          providerId: 'password',
          signInMethod: 'password',
        },
        operationType: 'signIn',
        additionalUserInfo: {
          isNewUser: true,
          providerId: 'password',
          profile: null,
        },
      } as unknown as firebase.default.auth.UserCredential)
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

    mockUsuarioService.agregarUsuario.and.returnValue(
      of({ message: 'Usuario agregado correctamente!' })
    );

    TestBed.configureTestingModule({
      declarations: [SignUpPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: HelperService, useValue: mockHelperService },
        { provide: StorageService, useValue: mockStorageService },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and register the user', async () => {
    component.form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      password: 'password123',
    });

    await component.submit();

    expect(mockFirebaseService.registro).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );

    expect(mockUsuarioService.agregarUsuario).toHaveBeenCalledWith(
      jasmine.objectContaining({
        p_correo_electronico: 'test@example.com',
        p_nombre: 'Test User',
        p_telefono: '123456789',
        token: 'mockToken',
      }),
      component.imagen
    );

    expect(mockHelperService.showAlert).toHaveBeenCalledWith(
      'Usuario registrado correctamente.',
      'Información'
    );
  });

  // Prueba para que no se intente agregar un usuario si el formulario es inválido
  it('should not submit the form if it is invalid', async () => {
    component.form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      phone: '',
      password: 'password123',
    });
  
    await component.submit();
  
    expect(mockFirebaseService.registro).not.toHaveBeenCalled();
    expect(mockUsuarioService.agregarUsuario).not.toHaveBeenCalled();
  
    expect(mockHelperService.showAlert).not.toHaveBeenCalled();
  });
});
