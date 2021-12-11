import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStoreState } from '../app-store/app-store.state';
import { selectUser } from '../app-store/user/user.selectors';
import { User } from '../interfaces/user';

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  public userSub: Subscription;

  constructor(
    private _templateRef: TemplateRef<unknown>,
    private _viewContainer: ViewContainerRef,
    private _store: Store<AppStoreState>
  ) { }

  ngOnInit(): void {
    this.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.userSub && this.userSub.unsubscribe();
  }

  private isAuthenticated(): void {
    this.userSub = this._store.select(selectUser).subscribe(
      (user: User) => {
        if (!user) {
          this._viewContainer.clear();
          return;
        } else {
          this._viewContainer.createEmbeddedView(this._templateRef);
        }
      }
    );
  }
}
