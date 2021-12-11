import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { Login } from 'src/app/app-store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginField') loginField: ElementRef;
  @ViewChild('passwordField') passwordField: ElementRef;

  constructor(
    private _store: Store<AppStoreState>
  ) { }

  login():void {
    const login = this.loginField.nativeElement.value;
    const password = this.passwordField.nativeElement.value;
    this._store.dispatch(new Login(login, password) );
  }
}
