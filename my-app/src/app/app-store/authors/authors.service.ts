/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getAuthors(textFragment: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/authors`, { params: { textFragment: textFragment } }).pipe(
      take(1)
    );
  }
}
