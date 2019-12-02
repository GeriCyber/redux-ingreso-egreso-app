import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DesactivarLoadingAction } from '../../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private afDB: AngularFirestore, private store: Store<Appstate>) { }

  ngOnInit() {
    this.subscription
    .add(this.store.select('ui')
      .subscribe((ui) => this.loading = ui.isLoading));
  }

  onSubmit(data: any) {
    this.authService.crearUsuario(data.email, data.password, data.name)
    .then((userFirebase) => {
      const user: User = {
        uid: userFirebase.user.uid,
        name: data.name,
        email: data.email
      };
      this.afDB.doc(`${user.uid}/user`).set(user)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Hubó un error al crear el usuario en nuestro sistema', error.message, 'error');
      });
    })
    .catch((error) => {
      this.store.dispatch(new DesactivarLoadingAction());
      Swal.fire('Hubó un error al registrarse', error.message, 'error');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
