import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseData } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  public data: CourseData;
  public id = +this._activatedRoute.snapshot.paramMap.get('id');

  constructor(
    private _coursesService: CoursesService,
    private _location: Location,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initPageConfiguration();
  }

  cancel(): void {
    this._location.back();
  }

  saveCourse(data: CourseData): void {
    this._coursesService.updateCourse(this.id, data);
    this._location.back();
  }

  initPageConfiguration(): void {
    this.data = this._coursesService.getCourse(this.id);
  }
}
