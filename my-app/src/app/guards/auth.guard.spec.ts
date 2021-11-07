import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['isAuthenticated'] ) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['parseUrl'] ) }
      ]
    });
  });

  beforeEach( () => {
    authServiceMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', () => {
    authServiceMock.isAuthenticated.and.returnValue(true);
    expect(guard.canActivate() ).toBe(true);
  });

  it('should return url "/login"', () => {
    const tree = { fragment: 'fakeFragment' } as UrlTree;
    authServiceMock.isAuthenticated.and.returnValue(false);
    routerMock.parseUrl.and.returnValue(tree);
    expect(guard.canActivate() ).toBe(tree);
    expect(routerMock.parseUrl).toHaveBeenCalledOnceWith('/login');
  });
});
