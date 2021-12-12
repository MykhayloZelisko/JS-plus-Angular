import { Action } from '@ngrx/store';
import { CourseAuthor } from 'src/app/interfaces/course';

/* eslint-disable no-unused-vars */
export enum AuthorsActionType {
  getAuthors = 'getCourseList',
  getAuthorsSuccess = 'getCourseListSuccess',
  getAuthorsFail = 'getCourseListFail'
}

export interface AuthorsAction extends Action {
  type: AuthorsActionType;
  authorsList?: CourseAuthor[];
  textFragment?: string;
}
