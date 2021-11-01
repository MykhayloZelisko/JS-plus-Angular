import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(): boolean | UrlTree {
    if (this._authService.isAuthenticated() ) {
      return true;
    } else {
      return this._router.parseUrl('/login');
    }
  }
}
