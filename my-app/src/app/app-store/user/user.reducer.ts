import { Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';
import { UserAction, UserActionType } from './user.models';

export function userReducer(state: User = null, action: Action): User {
  switch (action.type) {
  case UserActionType.updateUserInfo: {
    return (action as UserAction).user;
  }
  case UserActionType.loginFail:
  case UserActionType.logout: {
    return null;
  }
  default: {
    return state;
  }
  }
}
