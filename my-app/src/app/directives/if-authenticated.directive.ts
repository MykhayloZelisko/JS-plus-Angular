import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective {
  @Input() set ifAuthenticated(condition: boolean) {
    if (condition) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }

  constructor(
    private _templateRef: TemplateRef<unknown>,
    private _viewContainer: ViewContainerRef
  ) { }

}
