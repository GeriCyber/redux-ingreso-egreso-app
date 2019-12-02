import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Appstate } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { DesactivarLoadingAction } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private store: Store<Appstate>) { }

  ngOnInit() {
    this.subscription
    .add(this.store.select('ui')
      .subscribe((ui) => this.loading = ui.isLoading));
  }

  onSubmit(data: any) {
    this.authService.login(data.email, data.password)
    .then(() => {
      this.store.dispatch(new DesactivarLoadingAction());
      this.router.navigate(['/']);
    })
    .catch((error) => {
      this.store.dispatch(new DesactivarLoadingAction());
      Swal.fire('Usuario o contraseña inválida', error.message, 'error');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
