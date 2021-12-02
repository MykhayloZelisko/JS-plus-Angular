import { Action } from '@ngrx/store';
import { Course } from 'src/app/interfaces/course';
import { CourseListAction, CourseListActionType } from './courses.models';

export function courseListReducer(state: Course[] = [], action: Action): Course[] {
  switch (action.type) {
  case CourseListActionType.getCourseListSuccess: {
    return [...state, ...(action as CourseListAction).courseList];
  }
  case CourseListActionType.getCourseListFail: {
    return [];
  }
  default: {
    return state;
  }
  }
}
