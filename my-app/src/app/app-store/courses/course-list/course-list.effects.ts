import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { GetCourseList, GetCourseListFail, GetCourseListSuccess } from './course-list.actions';
import { CourseListActionType } from './course-list.models';
import { CoursesService } from '../courses.service';

@Injectable()

export class CourseListEffects {
  public getCourseList$: Observable<GetCourseListSuccess | GetCourseListFail> = createEffect( () => {
    return this._actions$.pipe(
      ofType(CourseListActionType.getCourseList),
      switchMap( (action: GetCourseList) => {
        return this._courseService.getCourseList(action.params);
      }),
      map( (res: Course[] ) => {
        return new GetCourseListSuccess(res);
      }),
      catchError( () => {
        return of(new GetCourseListFail() );
      })
    );
  });

  constructor(private _actions$: Actions, private _courseService: CoursesService) {}
}
