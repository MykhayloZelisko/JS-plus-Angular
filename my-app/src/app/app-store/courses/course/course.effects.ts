import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Course } from 'src/app/interfaces/course';
import { AppStoreState } from '../../app-store.state';
import { ToggleLoader } from '../../loader/loader.actions';
import { CoursesService } from '../courses.service';
import {
  CreateCourse,
  CreateCourseFail,
  CreateCourseSuccess,
  DeleteCourse,
  DeleteCourseFail,
  DeleteCourseSuccess,
  GetCourse,
  GetCourseFail,
  GetCourseSuccess,
  UpdateCourse,
  UpdateCourseFail,
  UpdateCourseSuccess
} from './course.actions';
import { CourseActionType } from './course.models';

@Injectable()

export class CourseEffects {
  public deleteCourse$: Observable<DeleteCourseSuccess | DeleteCourseFail> = createEffect( () => {
    return this._actions$.pipe(
      ofType(CourseActionType.deleteCourse),
      tap( () => {
        this._store.dispatch(new ToggleLoader() );
      }),
      switchMap( (action: DeleteCourse) => {
        return this._courseService.deleteCourse(action.id);
      }),
      tap( () => {
        this._store.dispatch(new ToggleLoader() );
      }),
      map( () => {
        return new DeleteCourseSuccess();
      }),
      catchError( () => {
        return of(new DeleteCourseFail() );
      })
    );
  });

  public getCourse$: Observable<GetCourseSuccess | GetCourseFail> = createEffect( () => {
    return this._actions$.pipe(
      ofType(CourseActionType.getCourse),
      switchMap( (action: GetCourse) => {
        return this._courseService.getCourse(action.id);
      }),
      map( (course: Course) => {
        return new GetCourseSuccess(course);
      }),
      catchError( () => {
        return of(new GetCourseFail() );
      })
    );
  });

  public updateCourse$: Observable<UpdateCourseSuccess | UpdateCourseFail> = createEffect( () => {
    return this._actions$.pipe(
      ofType(CourseActionType.updateCourse),
      tap( () => {
        this._store.dispatch(new ToggleLoader() );
      }),
      switchMap( (action: UpdateCourse) => {
        return this._courseService.updateCourse(action.id, action.data);
      }),
      tap( () => {
        this._store.dispatch(new ToggleLoader() );
      }),
      map( (course: Course) => {
        return new UpdateCourseSuccess(course);
      }),
      catchError( () => {
        return of(new UpdateCourseFail() );
      })
    );
  });

  public createCourse$: Observable<CreateCourseSuccess | CreateCourseFail> = createEffect( () => {
    return this._actions$.pipe(
      ofType(CourseActionType.createCourse),
      tap( () => {
        this._store.dispatch(new ToggleLoader() );
      }),
      switchMap( (action: CreateCourse) => {
        return this._courseService.createCourse(action.data);
      }),
      tap( () => {
        this._store.dispatch(new ToggleLoader() );
      }),
      map( (course: Course) => {
        return new CreateCourseSuccess(course);
      }),
      catchError( () => {
        return of(new CreateCourseFail() );
      })
    );
  });

  constructor(
    private _actions$: Actions,
    private _courseService: CoursesService,
    private _store: Store<AppStoreState>
  ) {}
}
