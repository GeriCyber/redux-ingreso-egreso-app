import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Appstate } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoSubs: Subscription = new Subscription();
  ingresoEgresoItemsSubs: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, private authService: AuthService, private store: Store<Appstate>) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoItemsSubs = this.store.select('auth')
    .pipe(
      filter((auth) => auth.user !== null)
    )
    .subscribe((auth) => this.ingresoEgresoItems(auth.user.uid));
  }

  createIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<any> {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
    .collection('items').add({...ingresoEgreso});
  }

  cancelSubscriptions() {
    this.ingresoEgresoItemsSubs.unsubscribe();
    this.ingresoEgresoSubs.unsubscribe();
  }

  deleteIngresoEgreso(uid: string) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
    .delete();
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubs = this.afDB.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map((data) => {
        return data.map((item) => {
          return {
            uid: item.payload.doc.id,
            ...item.payload.doc.data()
          };
        });
      })
    )
    .subscribe((collection: IngresoEgreso[]) => {
      this.store.dispatch(new SetItemsAction(collection));
    });
  }
}
