import { createSelector } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { AppState } from '../app.store';

export interface UserStore {
  user: User | null;
  isLoading: boolean;
  errors: string[];
}

export class UserStore implements UserStore {
  constructor({ user, errors, isLoading }: Partial<UserStore>) {
    this.user = user ? user : null;
    this.errors = errors?.length ? [...errors] : [];
    this.isLoading = isLoading ? isLoading : false;
  }
}

export const initialUserState: Readonly<UserStore> = new UserStore({});

export const selectUserStore = (state: AppState) => state.userStore;

export const getUser = createSelector(selectUserStore, (state) => state.user);
