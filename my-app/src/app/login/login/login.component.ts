import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginField') loginField: ElementRef;
  @ViewChild('passwordField') passwordField: ElementRef;

  constructor(private _authService: AuthService) { }

  login():void {
    const login = this.loginField.nativeElement.value;
    const password = this.passwordField.nativeElement.value;
    this._authService.login(login, password);
  }
}
