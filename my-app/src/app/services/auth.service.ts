/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userInfo: BehaviorSubject<User> = new BehaviorSubject(null);
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private _router: Router,
    private _http: HttpClient,
  ) { }

  login(login: string, password: string): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, { login, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigateByUrl('/login');
    this.userInfo.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserInfo(): Observable<User> {
    const token = localStorage.getItem('token');
    if (token) {
      return this._http.post(`${this.apiUrl}/userinfo`, { 'token': token }).pipe(
        map( (user: any) => ({
          id: user.id,
          firstName: user.name.first,
          lastName: user.name.last
        }) )
      );
    } else {
      return of(null);
    }
  }
}
