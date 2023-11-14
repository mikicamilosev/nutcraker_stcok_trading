import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  username: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  loggedIn: false,
  username: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, error: null })),
  on(AuthActions.loginSuccess, (state, { username }) => ({ ...state, loggedIn: true, username: username })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logout, () => initialState)
);