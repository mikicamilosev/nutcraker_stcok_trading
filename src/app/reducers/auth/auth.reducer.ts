import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure } from './auth.action';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  email: "",
  displayName: "",
  jwt: "",
  permission: {
    realTimeData: false,
    canTrade: false,
    canViewOrders: false,
  },
  role: "",
  userName: "",
  isAuth: false,
};

export const loginReducer = createReducer(
  initialState,
  on(
    loginSuccess,
    (
      state,
      { email, displayName, jwt, permission, role, userName, isAuth }
    ) => ({
      ...state,
      email: email,
      displayName: displayName,
      jwt: jwt,
      permission: permission,
      role: role,
      userName: userName,
      isAuth: true,
    })
  ),
  on(loginFailure, (state) => ({
    ...state,
    email: "",
    displayName: "",
    jwt: "",
    permission: {
      realTimeData: false,
      canTrade: false,
      canViewOrders: false,
    },
    role: "",
    userName: "",
    isAuth: false,
  }))
);
