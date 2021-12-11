import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStoreState } from './app-store/app-store.state';
import { LoginSuccess } from './app-store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _store: Store<AppStoreState>, private _router: Router) {}

  ngOnInit(): void {
    this.initUser();
  }

  initUser(): void {
    const token = localStorage.getItem('token');
    this._router.navigateByUrl('/login');
    if (token) {
      this._store.dispatch(new LoginSuccess(token) );
    }
  }
}
