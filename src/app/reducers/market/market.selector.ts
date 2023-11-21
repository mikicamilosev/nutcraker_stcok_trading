import { createSelector } from '@ngrx/store';

const selectMarket = (state: any) => state.market;

export const getMarketData = createSelector(
    selectMarket,
    (state) => state.data
);