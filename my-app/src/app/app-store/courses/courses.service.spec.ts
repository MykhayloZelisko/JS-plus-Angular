import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Course } from '../interfaces/course';
import { initTestScheduler, addMatchers, hot } from 'jasmine-marbles';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: jasmine.SpyObj<HttpClient>;

  const coursesListMock: Course[] = [{
    id: 1,
    title: 'Video Course 1. Name tag',
    creationDate: '08/28/2022',
    duration: 88,
    description: `Learn about`,
    topRated: false,
    authors: [{
      id: 123,
      name: 'John Doe'
    }]
  }];
  const courseMock = coursesListMock[0];
  const responseMock = {
    id: 1,
    name: 'Video Course 1. Name tag',
    description: `Learn about`,
    isTopRated: false,
    date: '08/28/2022',
    authors: [{
      id: 123,
      name: 'John Doe'
    }],
    length: 88
  };
  const resListMock = [{
    id: 1,
    name: 'Video Course 1. Name tag',
    description: `Learn about`,
    isTopRated: false,
    date: '08/28/2022',
    authors: [{
      id: 123,
      name: 'John Doe'
    }],
    length: 88
  }];

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get', 'post', 'patch', 'delete'] ) }
      ]
    });
    service = TestBed.inject(CoursesService);
  });

  beforeEach( () => {
    httpMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    initTestScheduler();
    addMatchers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return course 0', () => {
    httpMock.get.and.returnValue(of(responseMock) );
    expect(service.getCourse(1) ).toBeObservable(hot('(a|)', { a: courseMock }) );
  });

  it('should return courses list', () => {
    httpMock.get.and.returnValue(of(resListMock) );
    expect(service.getCourseList() ).toBeObservable(hot('(a|)', { a: coursesListMock }) );
  });

  it('should delete course', () => {
    httpMock.delete.and.returnValue(of(null) );
    expect(service.deleteCourse(1) ).toBeObservable(hot('(a|)', { a: null }) );
  });
});
