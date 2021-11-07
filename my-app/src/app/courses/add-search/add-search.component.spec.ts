import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AddSearchComponent } from './add-search.component';

describe('AddSearchComponent', () => {
  let component: AddSearchComponent;
  let fixture: ComponentFixture<AddSearchComponent>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSearchComponent ],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl'] ) }
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(AddSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to new course', () => {
    component.newCourse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('/courses/new');
  });
});
