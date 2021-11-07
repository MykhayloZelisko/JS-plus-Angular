/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';

import { EditCourseComponent } from './edit-course.component';

describe('EditCourseComponent', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;
  let activatedRouteMock: ActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => ''
      }
    }
  } as any;
  let coursesServiceMock: jasmine.SpyObj<CoursesService>;
  let locationMock: jasmine.SpyObj<Location>;
  const courseMock: Course = {
    id: 1,
    title: 'Video Course 1. Name tag',
    creationDate: '08/28/2022',
    duration: 88,
    description: `Learn about where you can find course descriptions, what information they include, how they work,
    and details about various components of a course description.  Course descriptions report information about a
    university or college's classes. They're published both in course catalogs that outline degree requirements and
    in course schedules that contain descriptions for all courses offered during a particular semester.`,
    topRated: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCourseComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: CoursesService, useValue: jasmine.createSpyObj('CoursesService', [
          'updateCourse',
          'getCourse'
        ] ) },
        { provide: Location, useValue: jasmine.createSpyObj('Location', ['back'] ) }
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    activatedRouteMock = TestBed.inject(ActivatedRoute);
    locationMock = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    coursesServiceMock = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;
    component.id = courseMock.id;
    component.data = courseMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shuld init component', () => {
    spyOn(component, 'initPageConfiguration');
    component.ngOnInit();
    expect(component.initPageConfiguration).toHaveBeenCalledTimes(1);
  });

  it('shuld init page configuration', () => {
    coursesServiceMock.getCourse.and.returnValue(courseMock);
    component.initPageConfiguration();
    expect(coursesServiceMock.getCourse).toHaveBeenCalledWith(courseMock.id);
    expect(component.data).toEqual(courseMock);
  });

  it('should redirect to courses', () => {
    component.cancel();
    expect(locationMock.back).toHaveBeenCalledTimes(1);
  });

  it('should update a course and redirect to courses', () => {
    component.saveCourse(courseMock);
    expect(coursesServiceMock.updateCourse).toHaveBeenCalledOnceWith(courseMock.id, courseMock);
    expect(locationMock.back).toHaveBeenCalledTimes(1);
  });
});
