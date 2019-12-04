import * as fromAuth from './auth.actions';
import { User } from './user.model';
import { from } from 'rxjs';

export interface AuthState {
    user: User;
}

const estadoInicial: AuthState = {
    user: null
};

export function authReducer(state = estadoInicial, action: fromAuth.Acciones): AuthState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                // tomando todas las propeidades de user y hacer pares de valores
                user: { ... action.user }
            };
        case fromAuth.UNSET_USER:
            return {
                user: null
            }
        default:
           return state;
    }
}
