/* eslint-disable no-magic-numbers */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let coursesServiceMock: jasmine.SpyObj<CoursesService>;
  const eventsSubject = new Subject();
  let routerMock: Router = {
    events: eventsSubject.asObservable()
  } as Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      providers: [
        { provide: AuthService, useValue: jasmine.createSpyObj('authService', ['isAuthenticated'] ) },
        { provide: CoursesService, useValue: jasmine.createSpyObj('coursesService', ['getCourse'] ) },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    authServiceMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerMock = TestBed.inject(Router);
    coursesServiceMock = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init breadcrumbs', () => {
    spyOn(component, 'setRoute');
    component.ngOnInit();
    expect(component.setRoute).toHaveBeenCalledTimes(1);
  });

  it('should set true isAuthenticated', () => {
    authServiceMock.isAuthenticated.and.returnValue(true);
    component.ngDoCheck();
    expect(component.isAuthenticated).toBe(true);
  });

  it('should set false isAuthenticated', () => {
    authServiceMock.isAuthenticated.and.returnValue(false);
    component.ngDoCheck();
    expect(component.isAuthenticated).toBe(false);
  });

  it('should set route Courses/New course', () => {
    eventsSubject.next(new NavigationEnd(null, '/courses/new', null) );
    expect(component.firstPathFragment).toBe('Courses');
    expect(component.secondPathFragment).toBe('New course');
  });

  it('should set route Page not found', () => {
    eventsSubject.next(new NavigationEnd(null, '/ooo', null) );
    expect(component.firstPathFragment).toBe('Page not found');
  });

  it('should set route Page not found', () => {
    eventsSubject.next(new NavigationEnd(null, '/courses/ooo/ooo', null) );
    expect(component.firstPathFragment).toBe('Page not found');
  });

  it('should set route Login', () => {
    eventsSubject.next(new NavigationEnd(null, '/login', null) );
    expect(component.firstPathFragment).toBe('Login');
  });

  it('should set route Courses', () => {
    eventsSubject.next(new NavigationEnd(null, '/courses', null) );
    expect(component.firstPathFragment).toBe('Courses');
  });

  it('should set route Courses/New course', () => {
    coursesServiceMock.getCourse.withArgs(2).and.returnValue(of({ title: 'Course 2' }) as Observable<Course>);
    eventsSubject.next(new NavigationEnd(null, '/courses/2', null) );
    expect(component.firstPathFragment).toBe('Courses');
    expect(component.secondPathFragment).toBe('Course 2');
  });
});
