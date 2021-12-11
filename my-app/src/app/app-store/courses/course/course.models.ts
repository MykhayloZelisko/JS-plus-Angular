import { Action } from '@ngrx/store';
import { Course, CourseData } from 'src/app/interfaces/course';

/* eslint-disable no-unused-vars */
export enum CourseActionType {
  deleteCourse = 'deleteCourse',
  deleteCourseSuccess = 'deleteCourseSuccess',
  deleteCourseFail = 'deleteCourseFail',
  getCourse = 'getCourse',
  getCourseSuccess = 'getCourseSuccess',
  getCourseFail = 'getCourseFail',
  updateCourse = 'updateCourse',
  updateCourseSuccess = 'updateCourseSuccess',
  updateCourseFail = 'updateCourseFail',
  createCourse = 'createCourse',
  createCourseSuccess = 'createCourseSuccess',
  createCourseFail = 'createCourseFail'
}

export interface CourseAction extends Action {
  type: CourseActionType;
  id?: number;
  course?: Course;
  data?: CourseData;
}
