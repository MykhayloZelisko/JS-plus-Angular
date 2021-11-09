import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AddSearchComponent } from './add-search.component';

describe('AddSearchComponent', () => {
  let component: AddSearchComponent;
  let fixture: ComponentFixture<AddSearchComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  const valueMock = 'search';

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
    component.value = valueMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to new course', () => {
    component.newCourse();
    expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith('/courses/new');
  });

  it('should emit delete on deletecourse', () => {
    spyOn(component.onSearch, 'emit');
    component.search();
    expect(component.onSearch.emit).toHaveBeenCalledOnceWith(valueMock);
  });
});
