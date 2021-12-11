import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDeleteCourse, Course } from 'src/app/interfaces/course';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { ClearCourseList, GetCourseList } from 'src/app/app-store/courses/course-list/course-list.actions';
import { selectCourseList } from 'src/app/app-store/courses/course-list/course-list.selectors';
import { HttpParams } from 'src/app/interfaces/http-params';
import { UpdateParams } from 'src/app/app-store/params/params.actions';
import { selectParams } from 'src/app/app-store/params/params.selector';
import { DeleteCourse, GetCourse } from 'src/app/app-store/courses/course/course.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  public coursesList: Course[] = [];
  public confirmDialogConfig: ConfigDeleteCourse = { isVisible: false, id: null, title: null };
  public filterSub: Subscription;
  public deleteCourseSub: Subscription;
  public initPageSub: Subscription;
  public start = 0;
  public count = +'5';
  public sort = 'date';

  constructor(
    private _router: Router,
    private _store: Store<AppStoreState>
  ) { }

  ngOnInit(): void {
    this.initCoursesPage();
  }

  ngOnDestroy(): void {
    this.filterSub && this.filterSub.unsubscribe();
    this.deleteCourseSub && this.deleteCourseSub.unsubscribe();
    this.initPageSub && this.initPageSub.unsubscribe();
  }

  initCoursesPage(): void {
    this._store.dispatch(new ClearCourseList() );
    this._store.dispatch(new UpdateParams({
      count: this.count,
      sort: this.sort
    } as HttpParams) );
    this.filterCourse('');
    this.initPageSub = this._store.select(selectCourseList).subscribe(
      (list: Course[] ) => {
        this.coursesList = list;
      }
    );
  }

  trackByIndex(index: number): number {
    return index;
  }

  loadCourses(): void {
    this.start = this.coursesList.length;
    this._store.dispatch(new UpdateParams({ start: this.start } as HttpParams) );
  }

  openConfirmDialog(id: number): void {
    const currentCourse = this.coursesList.find(course => course.id === id);
    if (currentCourse) {
      this.confirmDialogConfig = { isVisible: true, id: currentCourse.id, title: currentCourse.title };
    }
  }

  filterCourse(value: string): void {
    const minLength = 3;
    const delay = 1000;
    this._store.dispatch(new UpdateParams({ textFragment: value, start: 0 } as HttpParams) );
    if (value.length > minLength || value === '') {
      this.filterSub = this._store.select(selectParams).pipe(
        debounceTime(delay)
      ).subscribe(
        (params: HttpParams) => {
          return this.getCourseList(params);
        }
      );
    }
  }

  confirmDelete(): void {
    this.deleteCourse();
    this.confirmDialogConfig = { isVisible: false, id: null, title: null };
  }

  cancelDelete(): void {
    this.confirmDialogConfig = { isVisible: false, id: null, title: null };
  }

  deleteCourse(): void {
    this.start = 0;
    const id = this.confirmDialogConfig.id;
    this._store.dispatch(new DeleteCourse(id) );
    this._store.dispatch(new ClearCourseList() );
    this._store.dispatch(new UpdateParams({ start: this.start } as HttpParams) );
  }

  editCourse(course: Course): void {
    this._store.dispatch(new GetCourse(course.id) );
    this._router.navigateByUrl(`/courses/${course.id}`);
  }

  getCourseList(params?: HttpParams): void {
    this._store.dispatch(new GetCourseList(params) );
  }
}
