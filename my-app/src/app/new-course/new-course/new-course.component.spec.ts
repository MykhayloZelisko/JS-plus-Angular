import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseData } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';

import { NewCourseComponent } from './new-course.component';

describe('NewCourseComponent', () => {
  let component: NewCourseComponent;
  let fixture: ComponentFixture<NewCourseComponent>;
  let coursesServiceMock: jasmine.SpyObj<CoursesService>;
  let locationMock: jasmine.SpyObj<Location>;
  const dataMock: CourseData = {
    title: 'Video Course 1. Name tag',
    creationDate: '08/28/2022',
    duration: 88,
    description: `Learn about where you can find course descriptions, what information they include, how they work,
    and details about various components of a course description.  Course descriptions report information about a
    university or college's classes. They're published both in course catalogs that outline degree requirements and
    in course schedules that contain descriptions for all courses offered during a particular semester.`
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCourseComponent ],
      providers: [
        { provide: CoursesService, useValue: jasmine.createSpyObj('CoursesService', ['createCourse'] ) },
        { provide: Location, useValue: jasmine.createSpyObj('Location', ['back'] ) }
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    locationMock = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    coursesServiceMock = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(NewCourseComponent);
    component = fixture.componentInstance;
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

  it('should redirect to courses', () => {
    component.cancel();
    expect(locationMock.back).toHaveBeenCalledTimes(1);
  });

  it('should create a course and redirect to courses', () => {
    component.saveCourse(dataMock);
    expect(coursesServiceMock.createCourse).toHaveBeenCalledOnceWith(dataMock);
    expect(locationMock.back).toHaveBeenCalledTimes(1);
  });

  it('should init page configuration', () => {
    component.initPageConfiguration();
    expect(component.data).toEqual({
      title: null,
      creationDate: null,
      duration: null,
      description: null
    });
  });
});
