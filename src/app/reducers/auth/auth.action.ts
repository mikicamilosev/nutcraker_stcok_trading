import { createAction, props } from '@ngrx/store';
import { PermissionProps } from './auth.state';

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ email: string,
    displayName: string,
    jwt: string,
    permission: PermissionProps,
    role: string,
    userName: string,
    isAuth: Boolean}>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ username: string, password: string }>()
);