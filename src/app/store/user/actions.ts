import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const loginUser = createAction(
  '[USER] login',
  props<{ payload: { email: string; password: string } }>()
);
export const loginUserSuccess = createAction(
  '[USER] login sucess',
  props<{ payload: User }>()
);
export const loginUserFailure = createAction(
  '[USER] login failure',
  props<{ payload: { errorMessage: string } }>()
);
export const logout = createAction('[USER] logout');
export const logoutSuccess = createAction('[USER] logout success');
export const logoutFailure = createAction(
  '[USER] logout failure',
  props<{ payload: { errorMessage: string } }>()
);
