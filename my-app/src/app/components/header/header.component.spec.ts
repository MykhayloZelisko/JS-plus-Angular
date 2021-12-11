import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/app-store/user/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', [
          'logout',
          'isAuthenticated'
        ] ) }
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    authServiceMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalledTimes(1);
  });
});
