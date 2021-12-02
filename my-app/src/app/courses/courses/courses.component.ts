import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDeleteCourse, Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/app-store/courses/courses.service';
import { LoadingService } from 'src/app/services/loading.service';
import { debounceTime, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { GetCourseList } from 'src/app/app-store/courses/courses.actions';
import { selectCourseList } from 'src/app/app-store/courses/courses.selectors';
import { HttpParams } from 'src/app/interfaces/http-params';

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
  private start = 0;
  private count = +'5';
  private textFragment = '';
  private sort = 'date';

  constructor(
    private _coursesService: CoursesService,
    private _router: Router,
    private _loadingService: LoadingService,
    private _store: Store<AppStoreState>
  ) { }

  ngOnInit(): void {
    this.filterCourse();
  }

  ngOnDestroy(): void {
    this.filterSub && this.filterSub.unsubscribe();
    this.deleteCourseSub && this.deleteCourseSub.unsubscribe();
  }

  trackByIndex(index: number): number {
    return index;
  }

  loadCourses(): void {
    this.start = this.coursesList.length;
    this.getCourseList(this.getParams() );
  }

  openConfirmDialog(id: number): void {
    const currentCourse = this.coursesList.find(course => course.id === id);
    if (currentCourse) {
      this.confirmDialogConfig = { isVisible: true, id: currentCourse.id, title: currentCourse.title };
    }
  }

  filterCourse(): void {
    const minLength = 3;
    const delay = 1000;
    this.filterSub = this._coursesService.searchValue.pipe(
      debounceTime(delay)
    ).subscribe(
      (value) => {
        if (value.length >= minLength || value === '') {
          this.start = 0;
          this.coursesList = [];
          this.textFragment = value;
          this.getCourseList(this.getParams() );
          this._store.select(selectCourseList).subscribe(
            (list: Course[] ) => {
              this.coursesList = list;
            }
          );
        }
      }
    );
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
    this.coursesList = [];
    const id = this.confirmDialogConfig.id;
    this._loadingService.toggle();
    this.deleteCourseSub = this._coursesService.deleteCourse(id).pipe(
      finalize( () => this._loadingService.toggle() )
    ).subscribe(
      () => this.getCourseList(this.getParams() )
    );
  }

  editCourse(course: Course): void {
    this._router.navigateByUrl(`/courses/${course.id}`);
  }

  getCourseList(params?: HttpParams): void {
    this._store.dispatch(new GetCourseList(params) );
  }

  private getParams(): HttpParams {
    return {
      start: this.start,
      count: this.count,
      textFragment: this.textFragment,
      sort: this.sort
    };
  }
}
