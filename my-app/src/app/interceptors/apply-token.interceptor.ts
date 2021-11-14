import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApplyTokenInterceptor implements HttpInterceptor {

  constructor() {}

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
