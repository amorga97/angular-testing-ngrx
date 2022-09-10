import { createReducer, on } from '@ngrx/store';
import * as user from './actions';
import { initialUserState, UserStore } from './state';

export const UserReducer = createReducer(
  initialUserState,
  on(user.loginUser, (_) => new UserStore({ isLoading: true })),
  on(
    user.loginUserSuccess,
    (_, { payload }) => new UserStore({ isLoading: false, user: payload })
  ),
  on(
    user.loginUserFailure,
    (_, { payload }) =>
      new UserStore({ errors: [payload.errorMessage], isLoading: false })
  ),
  on(user.logout, (state) => new UserStore({ ...state, isLoading: true })),
  on(user.logoutSuccess, () => new UserStore({})),
  on(
    user.logoutFailure,
    (store, { payload }) =>
      new UserStore({
        ...store,
        isLoading: false,
        errors: [payload.errorMessage],
      })
  )
);
