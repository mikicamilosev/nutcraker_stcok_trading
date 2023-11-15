import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './auth.action';

export interface State {
  username: string;
  password: string;
  isAuth: Boolean;
}

const initialState: State = {
  username: '',
  password: '',
  isAuth: false
};

export const loginReducer = createReducer(initialState,
  on(login, state => ({ ...state, isAuth: false })),
  on(loginSuccess, state => ({ ...state, isAuth: true })),
  on(loginFailure, state => ({ ...state, isAuth: false }))
);