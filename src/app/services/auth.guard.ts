import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const auth = getAuth(); // Inicializa el servicio de autenticación de Firebase
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Si el usuario está autenticado, permitir el acceso a la ruta
          resolve(true);
        } else {
          // Si el usuario no está autenticado, redirigir a la página de autenticación
          this.router.navigate(['/auth']);
          resolve(false);
        }
      });
    });
  }
}
