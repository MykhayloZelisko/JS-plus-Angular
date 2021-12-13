import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CourseAuthor } from 'src/app/interfaces/course';
import { GetAuthors, GetAuthorsFail, GetAuthorsSuccess } from './authors.actions';
import { AuthorsActionType } from './authors.models';
import { AuthorsService } from './authors.service';

@Injectable()

export class AuthorsEffects {
  public getAuthors$: Observable<GetAuthorsSuccess | GetAuthorsFail> = createEffect( () => {
    return this._actions$.pipe(
      ofType(AuthorsActionType.getAuthors),
      switchMap( (action: GetAuthors) => {
        return this._authorsService.getAuthors(action.textFragment);
      }),
      map( (authors: CourseAuthor[] ) => {
        return new GetAuthorsSuccess(authors);
      }),
      catchError( () => {
        return of(new GetAuthorsFail() );
      })
    );
  });

  constructor(
    private _actions$: Actions,
    private _authorsService: AuthorsService
  ) {}
}
