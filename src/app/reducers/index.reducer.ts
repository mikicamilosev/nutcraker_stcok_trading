import {
    ActionReducerMap,
    MetaReducer,
    ActionReducer,
    Action
  } from '@ngrx/store';
  import * as fromAuth from './auth/auth.reducer';
  
import * as fromMaket from './market/market.reducer'
import { MarketState } from './market/market.state';
  
  export interface AppState {
    auth: any;
    market: MarketState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.loginReducer,
    market: fromMaket.watchlistReducer
  };
  
  export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState | undefined, action: Action): AppState {
      if (action.type === '[Auth] LOGOUT completed') {
        state = undefined;
      }
      return reducer(state, action);
    };
  }
  
  
  export const metaReducers: MetaReducer<AppState>[] = [clearState];
  