import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CourseData } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit, OnDestroy {
  public data: CourseData;
  public createCourseSub: Subscription;

  constructor(
    private _coursesService: CoursesService,
    private _location: Location,
    private _loadingService: LoadingService
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
    this._loadingService.toggle();
    this.createCourseSub = this._coursesService.createCourse(data).pipe(
      finalize( () => this._loadingService.toggle() )
    ).subscribe();
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
