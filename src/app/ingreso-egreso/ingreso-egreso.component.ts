import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { Appstate } from './ingreso-egreso.reducer';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  type = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  loading: boolean;

  constructor(private ingresoEgresoService: IngresoEgresoService, private store: Store<Appstate>) { }

  ngOnInit() {
    this.loadingSubs = this.store.select('ui')
    .subscribe((ui) => this.loading = ui.isLoading);
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(Validators.min(0))
    });
  }

  createIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.form.value, type: this.type });
    this.ingresoEgresoService.createIngresoEgreso(ingresoEgreso)
    .then(() => {
      Swal.fire('Accion creada correctamente', ingresoEgreso.description, 'success');
      this.store.dispatch(new DesactivarLoadingAction());
      this.form.reset();
    })
    .catch((error) => {
      this.store.dispatch(new DesactivarLoadingAction());
      Swal.fire('Hubo un error al crear la accion solicitada', error.message, 'error');
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
