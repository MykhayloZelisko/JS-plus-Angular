import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseData } from 'src/app/interfaces/course';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { CreateCourse } from 'src/app/app-store/courses/course/course.actions';
import { ClearCourseList } from 'src/app/app-store/courses/course-list/course-list.actions';
import { UpdateParams } from 'src/app/app-store/params/params.actions';
import { HttpParams } from 'src/app/interfaces/http-params';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit, OnDestroy {
  public data: CourseData;
  public createCourseSub: Subscription;

  constructor(
    private _location: Location,
    private _store: Store<AppStoreState>
  ) { }

  ngOnInit(): void {
    this.initPageConfiguration();
  }

  ngOnDestroy(): void {
    this.createCourseSub && this.createCourseSub.unsubscribe();
  }

  cancel(): void {
    this._location.back();
  }

  saveCourse(data: CourseData): void {
    this._store.dispatch(new CreateCourse(data) );
    this._store.dispatch(new ClearCourseList() );
    this._store.dispatch(new UpdateParams({ start: 0 } as HttpParams) );
    this._location.back();
  }

  initPageConfiguration(): void {
    this.data = {
      title: null,
      creationDate: null,
      duration: null,
      description: null,
      authors: [{ id: null, name: null }]
    };
  }
}
