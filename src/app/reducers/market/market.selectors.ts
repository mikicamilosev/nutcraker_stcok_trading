import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index.reducer';
import { WatchlistDTO } from 'src/app/services/api.service';
import { MarketState } from './market.state';

export const getMarketState = (state: AppState) => state.market;

export const getWatchlists = createSelector(
    getMarketState,
    (market: MarketState) => market.watchlists
);
export const getIndexWatchlistId = createSelector(
    getMarketState,
    (market: MarketState) => market.indexWatchlistId
);

export const getInstruments = createSelector(
    getMarketState,
    (market: MarketState) => market.instruments
)