import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course, CourseData } from 'src/app/interfaces/course';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { selectCourse } from 'src/app/app-store/courses/course/course.selectors';
import { UpdateCourse } from 'src/app/app-store/courses/course/course.actions';
import { ClearCourseList } from 'src/app/app-store/courses/course-list/course-list.actions';
import { UpdateParams } from 'src/app/app-store/params/params.actions';
import { HttpParams } from 'src/app/interfaces/http-params';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  public data: CourseData;
  public id = +this._activatedRoute.snapshot.paramMap.get('id');
  public getCourseSub: Subscription;
  public updateCourseSub: Subscription;

  constructor(
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<AppStoreState>
  ) { }

  ngOnInit(): void {
    this.initPageConfiguration();
  }

  ngOnDestroy(): void {
    this.getCourseSub && this.getCourseSub.unsubscribe();
    this.updateCourseSub && this.updateCourseSub.unsubscribe();
  }

  cancel(): void {
    this._location.back();
  }

  saveCourse(data: CourseData): void {
    this._store.dispatch(new UpdateCourse(this.id, data) );
    this._store.dispatch(new ClearCourseList() );
    this._store.dispatch(new UpdateParams({ start: 0 } as HttpParams) );
    this._location.back();
  }

  initPageConfiguration(): void {
    this.getCourseSub = this._store.select(selectCourse).subscribe(
      (course: Course) => {
        if(course) {
          this.data = {
            title: course.title,
            description: course.description,
            creationDate: course.creationDate,
            duration: course.duration,
            authors: [...course.authors]
          };
        }
      }
    );
  }
}
