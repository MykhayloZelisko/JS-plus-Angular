import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseData } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {
  public data: CourseData;

  constructor(
    private _coursesService: CoursesService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.initPageConfiguration();
  }

  cancel(): void {
    this._location.back();
  }

  saveCourse(data: CourseData): void {
    this._coursesService.createCourse(data);
    this._location.back();
  }

  initPageConfiguration(): void {
    this.data = {
      title: null,
      creationDate: null,
      duration: null,
      description: null
    };
  }
}
