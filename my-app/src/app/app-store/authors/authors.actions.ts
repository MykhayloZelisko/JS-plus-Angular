/* eslint-disable no-unused-vars */
import { CourseAuthor } from 'src/app/interfaces/course';
import { AuthorsAction, AuthorsActionType } from './authors.models';

export class GetAuthors implements AuthorsAction {
  public readonly type: AuthorsActionType = AuthorsActionType.getAuthors;

  constructor(public textFragment: string) {}
}

export class GetAuthorsSuccess implements AuthorsAction {
  public readonly type: AuthorsActionType = AuthorsActionType.getAuthorsSuccess;

  constructor(public authorsList: CourseAuthor[] ) {}
}

export class GetAuthorsFail implements AuthorsAction {
  public readonly type: AuthorsActionType = AuthorsActionType.getAuthorsFail;

  constructor() {}
}


