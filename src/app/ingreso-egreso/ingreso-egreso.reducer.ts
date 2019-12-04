import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Appstate } from '../app.reducer';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

export interface Appstate extends Appstate {
    ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer(state = estadoInicial, action: fromIngresoEgreso.Acciones): IngresoEgresoState {
    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [
                    ...action.items.map((item) => {
                        return { ...item };
                    })
                ]
            };
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}
