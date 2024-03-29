import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppStoreState } from '../app-store/app-store.state';
import { selectUser } from '../app-store/user/user.selectors';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _store: Store<AppStoreState>
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this._store.select(selectUser).pipe(
      map( (user: User) => {
        return user ? true : this._router.parseUrl('/login');
      })
    );
  }
}
