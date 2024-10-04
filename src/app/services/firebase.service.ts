import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

 auth = inject(AngularFireAuth);


  // ==================== Autenticación ====================

  // ======== Acceder ========
  signIn(user) {
  return signInWithEmailAndPassword(getAuth(), )
  }
}
