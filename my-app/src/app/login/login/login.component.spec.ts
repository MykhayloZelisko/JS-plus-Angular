import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/app-store/user/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['login'] ) }
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    authServiceMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    component.login();
    expect(authServiceMock.login).toHaveBeenCalledTimes(1);
  });
});
