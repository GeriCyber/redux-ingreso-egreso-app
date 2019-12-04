import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { Appstate } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { UnsetUserAction } from '../../auth/auth.actions';
import { UnsetItemsAction } from 'src/app/ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User;
  subs: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<Appstate>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    setTimeout(() => {
      this.user = this.authService.getUser();
    }, 800);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
      this.store.dispatch(new UnsetUserAction());
      this.store.dispatch(new UnsetItemsAction());
      this.ingresoEgresoService.cancelSubscriptions();
    })
    .catch((error) => {
      Swal.fire('Hubo un error, intentalo de nuevo', error.message, 'error');
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
