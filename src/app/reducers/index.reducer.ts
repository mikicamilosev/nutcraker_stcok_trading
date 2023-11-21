import {
    ActionReducerMap,
    MetaReducer,
    ActionReducer,
    Action
  } from '@ngrx/store';
  import * as fromAuth from './auth/auth.reducer';
  import * as fromMarket from './market/market.reducer'
  
import { AuthState } from './auth/auth.state';
import { MarketState } from './market/market.state';
  
  export interface AppState {
    auth: AuthState;
    market: MarketState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.loginReducer,
    market: fromMarket.marketReducer
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
  