import { Action } from '@ngrx/store';
import { Course } from 'src/app/interfaces/course';
import { HttpParams } from 'src/app/interfaces/http-params';

/* eslint-disable no-unused-vars */
export enum CourseListActionType {
  getCourseList = 'getCourseList',
  getCourseListSuccess = 'getCourseListSuccess',
  getCourseListFail = 'getCourseListFail'
}

export interface CourseListAction extends Action {
  type: CourseListActionType;
  courseList?: Course[];
  params?: HttpParams;
}
