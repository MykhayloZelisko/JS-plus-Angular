import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let locathionMock: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ],
      providers: [
        { provide: Location, useValue: jasmine.createSpyObj('Locathion', ['back'] ) }
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    locathionMock = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    component.goBack();
    expect(locathionMock.back).toHaveBeenCalledTimes(1);
  });
});
