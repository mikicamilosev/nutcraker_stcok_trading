import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index.reducer';
import { MarketState } from './market.state';

export const getMarketState = (state: AppState) => state.market;

export const getWatchlists = createSelector(
    getMarketState,
    (market: MarketState) => market.watchlists
);