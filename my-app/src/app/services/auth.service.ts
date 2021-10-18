import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  private token: string;

  constructor(private _router: Router) { }

  login(): void {
    this.user = {
      id: 1234,
      firstName: 'John',
      lastName: 'Doe'
    };
    this.token = 'token';

    localStorage.setItem('user', JSON.stringify(this.user) );
    localStorage.setItem('token', this.token);

    this._router.navigateByUrl('/courses');
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserInfo(): User {
    return this.user;
  }
}
