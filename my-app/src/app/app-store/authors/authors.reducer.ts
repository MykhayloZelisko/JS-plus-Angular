import { Action } from '@ngrx/store';
import { CourseAuthor } from 'src/app/interfaces/course';
import { AuthorsAction, AuthorsActionType } from './authors.models';

export function authorsListReducer(state: CourseAuthor[] = [], action: Action): CourseAuthor[] {
  switch (action.type) {
  case AuthorsActionType.getAuthorsSuccess: {
    return (action as AuthorsAction).authorsList;
  }
  default: {
    return state;
  }
  }
}
