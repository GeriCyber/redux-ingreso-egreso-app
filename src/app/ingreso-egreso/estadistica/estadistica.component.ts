import { Component, OnInit } from '@angular/core';
import { Appstate } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cantidadIngresos: number;
  cantidadEgresos: number;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<Appstate>) { }

  ngOnInit() {
    this.store.select('ingresoEgreso').subscribe((ingresoEgreso) => this.countIngresoEgreso(ingresoEgreso.items));
  }

  countIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cantidadIngresos = 0;
    this.cantidadEgresos = 0;

    items.forEach((item) => {
      if (item.type === 'ingreso') {
        this.cantidadIngresos ++;
        this.ingresos += item.amount;
      } else {
        this.cantidadEgresos ++;
        this.egresos += item.amount;
      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];
  }

}
