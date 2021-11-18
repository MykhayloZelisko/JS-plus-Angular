import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit {

  constructor(
    private _templateRef: TemplateRef<unknown>,
    private _viewContainer: ViewContainerRef,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated();
  }

  private isAuthenticated(): void {
    this._authService.userInfo.subscribe(
      (user: User) => {
        if (user === null) {
          this._viewContainer.clear();
        } else {
          this._viewContainer.createEmbeddedView(this._templateRef);
        }
      }
    );
  }
}
