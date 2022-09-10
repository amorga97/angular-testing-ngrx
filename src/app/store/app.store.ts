import { User } from '../models/user';
import { UserReducer } from './user/reducer';
import { UserStore } from './user/state';

export interface AppState {
  userStore: UserStore;
}

export const AppStore = {
  userStore: UserReducer,
};
