import { createReducer, on } from '@ngrx/store';
import {
  updateWatchlists,
} from './market.action';
import {
  WatchlistDTO,
  WatchlistInstrumentDTO,
} from 'src/app/services/api.service';
import { MarketState } from './market.state';

const initialState: MarketState = {
  watchlists: [],
};

export const watchlistReducer = createReducer(
  initialState,
  on(updateWatchlists, (state, { watchlists }) => {
    console.log(state);
    return {
      ...state,
      watchlists: watchlists,
    };
  })
);
