import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  public userSub: Subscription;

  constructor(
    private _templateRef: TemplateRef<unknown>,
    private _viewContainer: ViewContainerRef,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.userSub && this.userSub.unsubscribe();
  }

  private isAuthenticated(): void {
    this.userSub = this._authService.userInfo.subscribe(
      (user: User) => {
        if (user === null) {
          this._viewContainer.clear();
          return;
        } else {
          this._viewContainer.createEmbeddedView(this._templateRef);
        }
      }
    );
  }
}
