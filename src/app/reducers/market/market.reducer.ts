import { createReducer, on } from '@ngrx/store';
import { watchlists, indexWatchlistId, watchlistInstruments, updateInstruments } from './market.action';
import { WatchlistDTO, WatchlistInstrumentDTO } from 'src/app/services/api.service';
import { MarketState } from './market.state';

const initialState: MarketState = {
    watchlists: [],
    indexWatchlistId: '',
    watchInstruments: [],
    instruments: []
};

export const watchlistReducer = createReducer(
    initialState,
    on(watchlists, (state, { watchlists }) => ({
        ...state,
        watchlists: watchlists
    })),
    on(indexWatchlistId, state => state),
    on(watchlistInstruments, state => state),
    on(updateInstruments, (state, {instruments}) => ({
        ...state,
        instruments: instruments
    }))
  );