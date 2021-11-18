import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDeleteCourse, Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public coursesList: Course[] = [];
  public confirmDialogConfig: ConfigDeleteCourse = { isVisible: false, id: null, title: null };
  private start = 0;
  private count = +'5';
  private textFragment = '';
  private sort = 'date';

  constructor(
    private _coursesService: CoursesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getCourseList(this.getParams() );
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

  filterCourse(value: string): void {
    this.start = 0;
    this.coursesList = [];
    this.textFragment = value;
    this.getCourseList(this.getParams() );
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
    this._coursesService.deleteCourse(id).subscribe(
      () => this.getCourseList(this.getParams() )
    );
  }

  editCourse(course: Course): void {
    this._router.navigateByUrl(`/courses/${course.id}`);
  }

  getCourseList(params?: HttpParams): void {
    this.start = 0;
    this._coursesService.getCourseList(params).subscribe(
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
