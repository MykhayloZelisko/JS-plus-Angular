import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { Login } from 'src/app/app-store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = this._fb.group({
    login: [
      '',
      Validators.required
    ],
    password: [
      '',
      Validators.required
    ]
  })

  constructor(
    private _store: Store<AppStoreState>,
    private _fb: FormBuilder
  ) { }

  login():void {
    const { login, password } = this.loginForm.getRawValue();
    this._store.dispatch(new Login(login, password) );
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    const result = control.invalid && control.dirty;
    return result;
  }
}
