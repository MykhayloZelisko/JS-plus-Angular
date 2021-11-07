/* eslint-disable no-magic-numbers */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let filterPipeMock: jasmine.SpyObj<FilterPipe>;
  let coursesServiceMock: jasmine.SpyObj<CoursesService>;
  let routerMock: jasmine.SpyObj<Router>;
  const coursesListMock: Course[] = [
    { id: 123, title: 'course 1' },
    { id: 13, title: 'course 2' },
    { id: 12, title: 'course 3' }
  ] as Course[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        OrderByPipe
      ],
      providers: [
        { provide: FilterPipe, useValue: jasmine.createSpyObj('FilterPipe', ['transform'] ) },
        { provide: CoursesService, useValue: jasmine.createSpyObj('CoursesService', [
          'deleteCourse',
          'getCourseList'
        ] ) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl'] ) }
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    filterPipeMock = TestBed.inject(FilterPipe) as jasmine.SpyObj<FilterPipe>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    coursesServiceMock = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    coursesServiceMock.getCourseList.and.returnValue(coursesListMock);
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get courselist on init', () => {
    expect(coursesServiceMock.getCourseList).toHaveBeenCalledTimes(1);
    expect(component.coursesList).toEqual(coursesListMock);
    expect(component.filteredList).toEqual(coursesListMock);
  });

  it('should track by index', () => {
    expect(component.trackByIndex(0) ).toBe(0);
    expect(component.trackByIndex(5) ).toBe(5);
  });

  it('should open confirm dialog on openConfirmDialog with correct id', () => {
    component.filteredList = coursesListMock;
    component.openConfirmDialog(coursesListMock[0].id);
    expect(component.confirmDialogConfig).toEqual({
      isVisible: true,
      id: coursesListMock[0].id,
      title: coursesListMock[0].title
    });
  });

  it('should not open confirm dialog on openConfirmDialog with incorrect id', () => {
    component.filteredList = coursesListMock;
    component.openConfirmDialog(45);
    expect(component.confirmDialogConfig).toEqual({ isVisible: false, id: null, title: null });
  });

  it('should filter courses', () => {
    filterPipeMock.transform.and.returnValue( [coursesListMock[2]] );
    component.filterCourse('qwerty');
    expect(component.filteredList).toEqual( [coursesListMock[2]] );
    expect(filterPipeMock.transform).toHaveBeenCalledOnceWith(coursesListMock, 'qwerty');
  });

  it('should redirect to course id page on editCourse', () => {
    const course = coursesListMock[0];
    component.editCourse(course);
    expect(routerMock.navigateByUrl).toHaveBeenCalledOnceWith(`/courses/${course.id}`);
  });

  it('should cancel delete course', () => {
    component.cancelDelete();
    expect(component.confirmDialogConfig).toEqual({ isVisible: false, id: null, title: null });
  });

  it('should delete course', () => {
    const courseMock = coursesListMock[0];
    component.confirmDialogConfig = { id: courseMock.id, isVisible: true, title: courseMock.title };
    component.deleteCourse();
    expect(coursesServiceMock.deleteCourse).toHaveBeenCalledOnceWith(courseMock.id);
  });

  it('should confirm delete course', () => {
    spyOn(component, 'deleteCourse');
    component.confirmDelete();
    expect(component.deleteCourse).toHaveBeenCalledTimes(1);
    expect(component.confirmDialogConfig).toEqual({ isVisible: false, id: null, title: null });
  });
});
