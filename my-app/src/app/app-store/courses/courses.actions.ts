/* eslint-disable no-unused-vars */
import { Course } from 'src/app/interfaces/course';
import { HttpParams } from 'src/app/interfaces/http-params';
import { CourseListAction, CourseListActionType } from './courses.models';

export class GetCourseList implements CourseListAction {
  public readonly type: CourseListActionType = CourseListActionType.getCourseList;

  constructor(public params?: HttpParams) {}
}

export class GetCourseListSuccess implements CourseListAction {
  public readonly type: CourseListActionType = CourseListActionType.getCourseListSuccess;

  constructor(public courseList: Course[] ) {}
}

export class GetCourseListFail implements CourseListAction {
  public readonly type: CourseListActionType = CourseListActionType.getCourseListFail

  constructor() {}
}



