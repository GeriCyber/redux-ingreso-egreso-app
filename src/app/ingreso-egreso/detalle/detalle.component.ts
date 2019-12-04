import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Appstate } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<Appstate>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
    .subscribe((ingresoEgreso) => this.items = ingresoEgreso.items);
  }

  deleteItem(item: IngresoEgreso) {
    this.ingresoEgresoService.deleteIngresoEgreso(item.uid)
    .then(() =>  Swal.fire('Item eliminado correctamente', item.description, 'success'))
    .catch((error) =>  Swal.fire('Hubo un error al eliminar el item seleccionado', error.message, 'error'));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
