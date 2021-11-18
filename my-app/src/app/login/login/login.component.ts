import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  @ViewChild('loginField') loginField: ElementRef;
  @ViewChild('passwordField') passwordField: ElementRef;

  public loginSub: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _loadingService: LoadingService
  ) { }

  ngOnDestroy(): void {
    this.loginSub && this.loginSub.unsubscribe();
  }

  login():void {
    const login = this.loginField.nativeElement.value;
    const password = this.passwordField.nativeElement.value;
    this._loadingService.toggle();
    this.loginSub = this._authService.login(login, password).pipe(
      finalize( () => this._loadingService.toggle() )
    ).subscribe(
      (res: { token: string }) => {
        localStorage.setItem('token', res.token);
        this._router.navigateByUrl('/courses');
        this._authService.getUserInfo().subscribe(
          (user: User) => {
            this._authService.userInfo.next(user);
          }
        );
      }
    );
  }
}
