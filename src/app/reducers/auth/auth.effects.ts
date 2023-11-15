import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginSuccess, loginFailure } from './auth.action';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {

  // @Effect()
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login] User Login'),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(token => loginSuccess({ token })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}