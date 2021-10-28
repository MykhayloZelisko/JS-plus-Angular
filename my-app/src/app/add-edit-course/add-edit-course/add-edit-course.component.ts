import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseData } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss']
})
export class AddEditCourseComponent implements OnInit {
  @ViewChild('titleField') titleField: ElementRef;
  @ViewChild('descriptionField') descriptionField: ElementRef;

  public id = this._activatedRoute.snapshot.paramMap.get('id');
  public pageTitle: string;
  public data: CourseData;

  constructor(
    private _coursesService: CoursesService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.configPage();
  }

  cancel(): void {
    this._location.back();
  }

  getTitleAndDescription(): void {
    this.data.title = this.titleField.nativeElement.value;
    this.data.description = this.descriptionField.nativeElement.value;
  }

  getCourse(id: number): Course {
    return this._coursesService.getCourse(id);
  }

  getDate(date: string): void {
    this.data.creationDate = date;
  }

  getDuration(duration: number): void {
    this.data.duration = duration;
  }

  saveCourse(): void {
    this.getTitleAndDescription();
    if (this.id) {
      this._coursesService.updateCourse(+this.id, this.data);
    } else {
      this._coursesService.createCourse(this.data);
    }
    this._location.back();
  }

  configPage(): void {
    if (this.id) {
      this.data = this.getCourse(+this.id);
      this.pageTitle = 'Edit';
    } else {
      this.data = {
        title: null,
        creationDate: null,
        duration: null,
        description: null
      };
      this.pageTitle = 'New';
    }
  }
}
