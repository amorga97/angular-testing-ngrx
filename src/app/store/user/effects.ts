import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { LoginService } from 'src/app/public/login.service';
import { loginUser, loginUserFailure, loginUserSuccess } from './actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(({ payload }) =>
        this.loginService.login(payload).pipe(
          map((users) => {
            return loginUserSuccess({ payload: users });
          }),
          catchError((error) => {
            return of(loginUserFailure({ payload: error }));
          })
        )
      )
    )
  );
}
