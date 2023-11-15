import { createSelector } from '@ngrx/store';

const selectLogin = (state: any) => state.auth;

export const selectIsAuth = createSelector(
  selectLogin,
  (state) => state.isAuth
);