import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(): Observable<boolean> | Observable<UrlTree> {
    if (this._authService.isAuthenticated() ) {
      return of(true);
    } else {
      return of(this._router.parseUrl('/login') );
    }
  }
}
