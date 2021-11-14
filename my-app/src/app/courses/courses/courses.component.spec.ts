/* eslint-disable no-magic-numbers */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';
import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
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
        CoursesComponent
      ],
      providers: [
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
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    coursesServiceMock = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    coursesServiceMock.getCourseList.and.returnValue(of(coursesListMock) );
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
  });

  it('should track by index', () => {
    expect(component.trackByIndex(0) ).toBe(0);
    expect(component.trackByIndex(5) ).toBe(5);
  });

  it('should open confirm dialog on openConfirmDialog with correct id', () => {
    component.openConfirmDialog(coursesListMock[0].id);
    expect(component.confirmDialogConfig).toEqual({
      isVisible: true,
      id: coursesListMock[0].id,
      title: coursesListMock[0].title
    });
  });

  it('should not open confirm dialog on openConfirmDialog with incorrect id', () => {
    component.openConfirmDialog(45);
    expect(component.confirmDialogConfig).toEqual({ isVisible: false, id: null, title: null });
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
    coursesServiceMock.deleteCourse.withArgs(123).and.returnValue(of(null) );
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

  it('should filter course list', () => {
    spyOn(component, 'getCourseList');
    component.filterCourse('value');
    expect(component.getCourseList).toHaveBeenCalledTimes(1);
  });

  it('should load more courses', () => {
    spyOn(component, 'getCourseList');
    component.loadCourses();
    expect(component.getCourseList).toHaveBeenCalledTimes(1);
  });
});
