import { createSelector } from '@ngrx/store';

const selectMarket = (state: any) => state.auth;

export const selectIsAuth = createSelector(
    selectMarket,
    (state) => state.status
);