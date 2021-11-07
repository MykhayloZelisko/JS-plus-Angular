import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl'] ) }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  beforeEach( () => {
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to login', () => {
    service.logout();
    expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('/login');
  });

  it('should be autthenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');
    expect(service.isAuthenticated() ).toBe(true);
  });

  it('should not be autthenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(undefined);
    expect(service.isAuthenticated() ).toBe(false);
  });

  it('should redirect to courses', () => {
    service.login();
    expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('/courses');
  });
});
