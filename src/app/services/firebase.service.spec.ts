import { TestBed } from '@angular/core/testing';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireAuthModule, 
        AngularFireModule.initializeApp(environment.firebaseConfig), 
      ],
    });
    service = TestBed.inject(FirebaseService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });
});
