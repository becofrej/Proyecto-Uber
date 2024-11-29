import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsuarioService } from 'src/app/services/user/usuario.service';
import { StorageService } from './storage.service';
import { FirebaseService } from './firebase.service';
import { of } from 'rxjs';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let mockAngularFireAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;
  let mockStorageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    mockAngularFireAuth = jasmine.createSpyObj('AngularFireAuth', [
      'signInWithEmailAndPassword',
    ]);
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', [
      'obtenerUsuario',
    ]);
    mockStorageService = jasmine.createSpyObj('StorageService', [
      'getItem',
      'setItem',
      'setUserId',
      'getUserId',
    ]);

    // Configurar mocks
    mockAngularFireAuth.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve({
        user: {
          getIdToken: () => Promise.resolve('mockToken'),
        },
      } as any)
    );

    mockUsuarioService.obtenerUsuario.and.returnValue(
      of({
        message: 'Success',
        data: [
          {
            id_usuario: 123,
            nombre: 'Test User',
            correo_electronico: 'test@example.com',
            telefono: '1234567890',
            nombre_proyecto: 'Test Project',
            imagen_usuario: 'https://example.com/image.png',
          },
        ],
      })
    );

    mockStorageService.setUserId.and.callFake(async (userId: string) => {
      console.log(`Mock setUserId called with: ${userId}`);
      return Promise.resolve();
    });
    mockStorageService.setItem.and.callFake(
      async (key: string, value: string) => {
        console.log(`Mock setItem called with: ${key}, ${value}`);
        return Promise.resolve();
      }
    );

    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: StorageService, useValue: mockStorageService },
      ],
    });

    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in the user', async () => {
    await service.login('test@example.com', 'password123');

    expect(mockStorageService.setUserId).toHaveBeenCalledWith('123');
    expect(mockStorageService.setItem).toHaveBeenCalledWith(
      'token',
      'mockToken'
    );
  });
});
