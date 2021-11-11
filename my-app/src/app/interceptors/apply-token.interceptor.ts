import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApplyTokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('auth/login') ) {
      return next.handle(request);
    } else {
      const token = localStorage.getItem('token');
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', token),
      });
      return next.handle(authRequest);
    }
  }
}
