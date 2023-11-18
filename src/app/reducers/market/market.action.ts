import { createAction, props } from '@ngrx/store';
import { WatchlistDTO, WatchlistInstrumentDTO } from 'src/app/services/api.service';

export const watchlists = createAction(
  '[Login] User Login',
  props<{ watchlists: WatchlistDTO[] | WatchlistDTO }>()
);

export const indexWatchlistId = createAction(
  '[Login] Login Success',
  props<{ indexWatchlistId: string }>()
);

export const watchlistInstruments = createAction(
  '[Login] Login Failure',
  props<{ watchlistInstuments: WatchlistInstrumentDTO[] }>()
);
