import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AppStoreState } from '../app-store.state';
import { ToggleLoader } from '../loader/loader.actions';
import { AuthService } from './auth.service';
import { Login, LoginFail, LoginSuccess, Logout, UpdateUserInfo } from './user.actions';
import { UserActionType } from './user.models';

@Injectable()

export class UserEffects {
  public login$: Observable<LoginSuccess | LoginFail> = createEffect( () => {
    return this._actions$.pipe(
      ofType(UserActionType.login),
      switchMap( (action: Login) => {
        return this._authService.login(action.login, action.password);
      }),
      map( (res: {token: string}) => {
        return new LoginSuccess(res.token);
      }),
      catchError( () => {
        return of(new LoginFail() );
      })
    );
  });

  public loginSuccess$: Observable<UpdateUserInfo> = createEffect( () => {
    return this._actions$.pipe(
      ofType(UserActionType.loginSuccess),
      tap( (action: LoginSuccess) => {
        localStorage.setItem('token', action.token);
        this._store.dispatch(new ToggleLoader() );
      }),
      switchMap( () => {
        return this._authService.getUserInfo();
      }),
      map( (user: User) => {
        return new UpdateUserInfo(user);
      }),
      tap( () => {
        this._store.dispatch(new ToggleLoader() );
        this._router.navigateByUrl('/courses');
      })
    );
  });

  public logout$: Observable<Logout> = createEffect( () => {
    return this._actions$.pipe(
      ofType(UserActionType.logout),
      tap( () => {
        this._authService.logout();
      })
    );
  }, { dispatch: false });

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppStoreState>
  ) {}
}
