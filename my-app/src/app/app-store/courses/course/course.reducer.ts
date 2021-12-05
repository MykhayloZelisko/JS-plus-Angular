import { Action } from '@ngrx/store';
import { Course } from 'src/app/interfaces/course';
import { CourseAction, CourseActionType } from './course.models';

export function courseReducer(state: Course = null, action: Action): Course {
  switch (action.type) {
  case CourseActionType.getCourseSuccess:
    return (action as CourseAction).course;
  case CourseActionType.updateCourseSuccess:
    return null;
  default: {
    return state;
  }
  }
}
