import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private auth: AuthService) { }

  canActivate() {
    // false
    // no puede ver la ruta
    // true
    // puede ver la ruta
    return this.auth.isAuth();
  }

  canLoad() {
    return this.auth.isAuth()
    .pipe(
      take(1)
    );
  }
}
