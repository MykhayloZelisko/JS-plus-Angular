/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3004';

  constructor(private _http: HttpClient) { }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this._http.get<T>(`${this.apiUrl}/${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: T): Observable<any> {
    return this._http.post<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  patch<T>(endpoint: string, body: T): Observable<any> {
    return this._http.patch<T>(`${this.apiUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this._http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}
