import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
    private _router: Router
  ) { }

  ngOnDestroy(): void {
    this.loginSub && this.loginSub.unsubscribe();
  }

  login():void {
    const login = this.loginField.nativeElement.value;
    const password = this.passwordField.nativeElement.value;
    this.loginSub = this._authService.login(login, password).subscribe(
      (res: {token: string}) => {
        localStorage.setItem('token', res.token);
        this._router.navigateByUrl('/courses');
      }
    );
  }
}
