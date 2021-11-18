import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: Observable<User>

  constructor(
    private _authService: AuthService,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this._loadingService.toggle();
    this._authService.getUserInfo().pipe(
      finalize( () => this._loadingService.toggle() )
    ).subscribe(
      (user: User) => {
        if (user !== null) {
          this._authService.userInfo.next(user);
        }
      }
    );
    this.user = this._authService.userInfo;
  }

  logout(): void {
    this._authService.logout();
  }
}
