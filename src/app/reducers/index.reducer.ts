import {
    ActionReducerMap,
    MetaReducer,
    ActionReducer,
    Action
  } from '@ngrx/store';
  import * as fromAuth from './auth/auth.reducer';
  
import { AuthState } from './auth/auth.state';
  
  export interface AppState {
    auth: AuthState;
    // market: MarketState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.loginReducer,
    // market: fromMaket.watchlistReducer
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
  