import { TemplateRef, ViewContainerRef } from '@angular/core';
import { IfAuthenticatedDirective } from './if-authenticated.directive';

describe('IfAuthenticatedDirective', () => {
  const templateMock: TemplateRef<unknown> = {
    elementRef: null,
    createEmbeddedView: null
  };
  const viewContainerMock: jasmine.SpyObj<ViewContainerRef> = jasmine.createSpyObj('ViewContainerRef', [
    'createEmbeddedView',
    'clear'
  ] );
  const directive = new IfAuthenticatedDirective(templateMock, viewContainerMock);

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should create a template', () => {
    directive.ifAuthenticated = true;
    expect(viewContainerMock.createEmbeddedView).toHaveBeenCalledOnceWith(templateMock);
  });

  it('should clear a template', () => {
    directive.ifAuthenticated = false;
    expect(viewContainerMock.clear).toHaveBeenCalledOnceWith();
  });
});
