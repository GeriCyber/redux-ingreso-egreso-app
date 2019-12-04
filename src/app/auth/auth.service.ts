import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appstate } from '../app.reducer';
import { ActivarLoadingAction } from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private store: Store<Appstate>) { }

  crearUsuario( email: string, password: string, name?: string): Promise<any> {
    this.store.dispatch(new ActivarLoadingAction());
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<any> {
    this.store.dispatch(new ActivarLoadingAction());
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  initAuthListener(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map((fbUser) => {
        if (fbUser) {
          return true;
        } else {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  getUser(): any {
    this.store.select('auth')
      .subscribe((user) => {
        if (user) {
          this.user = user.user;
        } else {
          this.user = null;
        }
      });
    return {...this.user};
  }
}
