import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface Appstate {
    ui: fromUi.State;
    auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<Appstate> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer
};
