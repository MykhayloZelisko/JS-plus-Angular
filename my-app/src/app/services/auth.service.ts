/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private _router: Router,
    private _http: HttpClient,
  ) { }

  login(login: string, password: string): void {
    this._http.post(`${this.apiUrl}/login`, { login, password }).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this._router.navigateByUrl('/courses');
        console.log('Logged in successfully');
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserInfo(): Observable<User> {
    const token = localStorage.getItem('token');
    return this._http.post(`${this.apiUrl}/userinfo`, { 'token': token }).pipe(
      map( (user: any) => ({
        id: user.id,
        firstName: user.name.first,
        lastName: user.name.last
      }) )
    );
  }
}
