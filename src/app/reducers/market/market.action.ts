import { createAction, props } from '@ngrx/store';
import { WatchlistDTO, WatchlistInstrumentDTO } from 'src/app/services/api.service';
import { InstrumentProps } from './market.state';

export const watchlists = createAction(
  '[Login] User Login',
  props<{ watchlists: WatchlistDTO[] | WatchlistDTO }>()
);

export const indexWatchlistId = createAction(
  '[Login] Login Success',
  props<{ indexWatchlistId: String }>()
);

export const watchlistInstruments = createAction(
  '[Login] Login Failure',
  props<{ watchlistInstuments: WatchlistInstrumentDTO[] }>()
);

export const updateInstruments = createAction(
  '[Market] Instruments Update',
  props<{ instruments: InstrumentProps[] }>()
)

export const selectedWatchlist = createAction(
  '[Market] SelectedWatchList Change',
  props<{ selectedWatchlistId: String }>()
)