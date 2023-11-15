import {
    ActionReducerMap,
    MetaReducer,
    ActionReducer,
    Action
  } from '@ngrx/store';
  import * as fromAuth from './auth/auth.reducer';
//   import * as fromAdmin from '../admin/store/admin.reducer';
  import { AuthState } from './auth/auth.state';
//   import { AdminState } from '../admin/store/admin.state';
  
  export interface AppState {
    auth: any;
    // admin: AdminState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.loginReducer,
    // admin: fromAdmin.adminReducer
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
  