import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { Logout } from 'src/app/app-store/user/user.actions';
import { selectUser } from 'src/app/app-store/user/user.selectors';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public user$: Observable<User> = this._store.select(selectUser);
  public getUserSub: Subscription;

  constructor(
    private _store: Store<AppStoreState>
  ) { }

  logout(): void {
    this._store.dispatch(new Logout() );
  }
}
