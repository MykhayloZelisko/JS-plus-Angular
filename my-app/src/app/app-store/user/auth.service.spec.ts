import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../interfaces/user';
import { initTestScheduler, addMatchers, hot } from 'jasmine-marbles';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerMock: jasmine.SpyObj<Router>;
  let httpMock: jasmine.SpyObj<HttpClient>;
  const tokenMock = 'token';
  const userMock: User = {
    id: 123,
    firstName: 'Joe',
    lastName: 'Doe'
  };
  const userInfoMock = {
    id: 123,
    name: {
      first: 'Joe',
      last: 'Doe'
    }
  };

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl'] ) },
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['post'] ) }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  beforeEach( () => {
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    httpMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    initTestScheduler();
    addMatchers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to login', () => {
    service.logout();
    expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('/login');
  });

  it('should be autthenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(tokenMock);
    expect(service.isAuthenticated() ).toBe(true);
  });

  it('should not be autthenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(undefined);
    expect(service.isAuthenticated() ).toBe(false);
  });

  it('should redirect to courses', () => {
    httpMock.post.and.returnValue(of({ token: tokenMock }) );
    service.login('login', 'password');
    expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('/courses');
  });

  it('should get user', () => {
    httpMock.post.and.returnValue(of(userInfoMock) );
    spyOn(localStorage, 'getItem').and.returnValue(tokenMock);
    expect(service.getUserInfo() ).toBeObservable(hot('(a|)', { a: userMock }) );
  });
});
