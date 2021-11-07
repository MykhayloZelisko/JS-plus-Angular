/* eslint-disable no-magic-numbers */
import { TestBed } from '@angular/core/testing';
import { Course, CourseData } from '../interfaces/course';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  const coursesListMock: Course[] = [{
    id: 1,
    title: 'Video Course 1. Name tag',
    creationDate: '08/28/2022',
    duration: 88,
    description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
    topRated: false
  }];
  const courseDataMock: CourseData = {
    title: 'Video Course 1. Name tag',
    creationDate: '08/28/2022',
    duration: 88,
    description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`
  };

  beforeEach( () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
    service.coursesList = [...coursesListMock] as Course[];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return course 0', () => {
    expect(service.getCourse(1) ).toEqual(coursesListMock[0] );
  });

  it('should return undefined', () => {
    expect(service.getCourse(10) ).toEqual(undefined);
  });

  it('should return courses list', () => {
    expect(service.getCourseList() ).toEqual(coursesListMock);
  });

  it('should create course', () => {
    service.createCourse(courseDataMock);
    expect(service.coursesList).toEqual( [coursesListMock[0], { id: 2, topRated: false, ...courseDataMock } ] );
  });

  it('should update course', () => {
    service.updateCourse(1, courseDataMock);
    expect(service.coursesList[0].creationDate).toBe(courseDataMock.creationDate);
    expect(service.coursesList[0].description).toBe(courseDataMock.description);
    expect(service.coursesList[0].duration).toBe(courseDataMock.duration);
    expect(service.coursesList[0].title).toBe(courseDataMock.title);
  });

  it('should delete course', () => {
    service.deleteCourse(1);
    expect(service.coursesList).toEqual( [] );
  });
});
