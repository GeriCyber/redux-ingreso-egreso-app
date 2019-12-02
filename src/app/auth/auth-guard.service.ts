import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate() {
    // false
    // no puede ver la ruta
    // true
    // puede ver la ruta
    return this.auth.isAuth();
  }
}
