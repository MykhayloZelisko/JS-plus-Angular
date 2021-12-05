/* eslint-disable no-unused-vars */
import { Course } from 'src/app/interfaces/course';
import { CourseListAction, CourseListActionType } from './course-list.models';

export class GetCourseList implements CourseListAction {
  public readonly type: CourseListActionType = CourseListActionType.getCourseList;

  constructor(public params?: { start: number, count: number, textFragment: string, sort: string}) {}
}

export class GetCourseListSuccess implements CourseListAction {
  public readonly type: CourseListActionType = CourseListActionType.getCourseListSuccess;

  constructor(public courseList: Course[] ) {}
}

export class GetCourseListFail implements CourseListAction {
  public readonly type: CourseListActionType = CourseListActionType.getCourseListFail

  constructor() {}
}

export class ClearCourseList implements CourseListAction {
  public readonly type: CourseListActionType = CourseListActionType.clearCourseList

  constructor() {}
}


