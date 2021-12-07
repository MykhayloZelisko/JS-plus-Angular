import { Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/user';

/* eslint-disable no-unused-vars */
export enum UserActionType {
  login = 'login',
  loginSuccess = 'loginSuccess',
  loginFail = 'loginFail',
  logout = 'logout',
  updateUserInfo = 'userInfo'
}

export interface UserAction extends Action {
  type: UserActionType;
  user?: User;
  login?: string;
  password?: string;
  token?: string;
}
