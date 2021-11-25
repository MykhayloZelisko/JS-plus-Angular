import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDeleteCourse, Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpParams } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';
import { debounceTime, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
  public getCourseListSub: Subscription;
  private start = 0;
  private count = +'5';
  private textFragment = '';
  private sort = 'date';

  constructor(
    private _coursesService: CoursesService,
    private _router: Router,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.filterCourse();
  }

  ngOnDestroy(): void {
    this.filterSub && this.filterSub.unsubscribe();
    this.deleteCourseSub && this.deleteCourseSub.unsubscribe();
    this.getCourseListSub && this.getCourseListSub.unsubscribe();
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
    this.start = 0;
    this._loadingService.toggle();
    this.getCourseListSub = this._coursesService.getCourseList(params).pipe(
      finalize( () => this._loadingService.toggle() )
    ).subscribe(
      (list: Course[] ) => {
        this.coursesList.push(...list);
      }
    );
  }

  private getParams(): HttpParams {
    return new HttpParams()
      .set('start', this.start)
      .set('count', this.count)
      .set('textFragment', this.textFragment)
      .set('sort', this.sort);
  }
}
