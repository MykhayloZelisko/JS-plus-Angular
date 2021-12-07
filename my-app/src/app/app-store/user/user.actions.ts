/* eslint-disable no-unused-vars */
import { User } from 'src/app/interfaces/user';
import { UserAction, UserActionType } from './user.models';

export class Login implements UserAction {
  public readonly type: UserActionType = UserActionType.login;

  constructor(public login: string, public password: string) {}
}

export class LoginSuccess implements UserAction {
  public readonly type: UserActionType = UserActionType.loginSuccess;

  constructor(public token: string) {}
}

export class LoginFail implements UserAction {
  public readonly type: UserActionType = UserActionType.loginFail;

  constructor() {}
}

export class Logout implements UserAction {
  public readonly type: UserActionType = UserActionType.logout;

  constructor() {}
}

export class UpdateUserInfo implements UserAction {
  public readonly type: UserActionType = UserActionType.updateUserInfo;

  constructor(public user: User) {}
}

export class NavigateTo implements UserAction {
  public readonly type: UserActionType = UserActionType.navigateTo;

  constructor() {}
}

export class GetUserFail implements UserAction {
  public readonly type: UserActionType = UserActionType.getUserFail;

  constructor() {}
}
