import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course, CourseData } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  public data: CourseData = {
    title: null,
    creationDate: null,
    duration: null,
    description: null,
    authors: []
  };
  public id = +this._activatedRoute.snapshot.paramMap.get('id');
  public getCourseSub: Subscription;
  public updateCourseSub: Subscription;

  constructor(
    private _coursesService: CoursesService,
    private _location: Location,
    private _activatedRoute: ActivatedRoute
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
    this.updateCourseSub = this._coursesService.updateCourse(this.id, data).subscribe();
    this._location.back();
  }

  initPageConfiguration(): void {
    this.getCourseSub = this._coursesService.getCourse(this.id).subscribe(
      (res: Course) => {
        this.data = res;
      }
    );
  }
}
