import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/user/usuario.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import firebase from 'firebase/compat/app';
import { of } from 'rxjs';

describe('AuthPage', () => {
  let component: AuthPage;
  let fixture: ComponentFixture<AuthPage>;
  let mockFirebaseService: jasmine.SpyObj<FirebaseService>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockHelperService: jasmine.SpyObj<HelperService>;
  let mockStorageService: jasmine.SpyObj<StorageService>;
  let mockAngularFireAuth: any;

  beforeEach(waitForAsync(() => {
    mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['login']);
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['obtenerUsuario']);
    mockHelperService = jasmine.createSpyObj('HelperService', ['showLoader', 'showAlert']);
    mockStorageService = jasmine.createSpyObj('StorageService', ['setItem']);

    mockFirebaseService.login.and.returnValue(
      Promise.resolve({
        user: {
          getIdToken: () => Promise.resolve('mockToken'),
        },
        credential: null,
        operationType: 'signIn',
        additionalUserInfo: null,
      } as firebase.auth.UserCredential)
    );

    mockUsuarioService.obtenerUsuario.and.returnValue(
      of({
        message: 'Success',
        data: [
          {
            id_usuario: 123,
            nombre: 'John Doe',
            correo_electronico: 'test@example.com',
            telefono: '123456789',
            nombre_proyecto: 'Test Project',
            imagen_usuario: 'https://example.com/user.jpg',
          },
        ],
      })
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

    TestBed.configureTestingModule({
      declarations: [AuthPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService },
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: HelperService, useValue: mockHelperService },
        { provide: StorageService, useValue: mockStorageService },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in the user', async () => {
    component.form.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    await component.login();

    expect(mockFirebaseService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );

    expect(mockUsuarioService.obtenerUsuario).toHaveBeenCalledWith(
      jasmine.objectContaining({
        p_correo: 'test@example.com',
        token: 'mockToken',
      })
    );

    expect(mockHelperService.showAlert).toHaveBeenCalledWith(
      'Inicio de sesión exitoso',
      'Bienvenido'
    );
  });
});
