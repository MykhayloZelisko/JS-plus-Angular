import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  public getUserSub: Subscription;

  constructor(
    private _authService: AuthService,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.initUser();
  }

  ngOnDestroy(): void {
    this.getUserSub && this.getUserSub.unsubscribe();
  }

  logout(): void {
    this._authService.logout();
  }

  initUser(): void {
    this._loadingService.toggle();
    this.getUserSub = this._authService.getUserInfo().pipe(
      finalize( () => this._loadingService.toggle() )
    ).subscribe(
      (user: User) => {
        if (user !== null) {
          this._authService.userInfo.next(user);
        }
      }
    );
    this.user$ = this._authService.userInfo;
  }
}
