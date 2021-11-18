import { TestBed } from '@angular/core/testing';

import { ApplyTokenInterceptor } from './apply-token.interceptor';

describe('ApplyTokenInterceptor', () => {
  let interceptor: ApplyTokenInterceptor;

  beforeEach( () => TestBed.configureTestingModule({
    providers: [
      ApplyTokenInterceptor
    ]
  }) );

  beforeEach( () => {
    interceptor = TestBed.inject(ApplyTokenInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
