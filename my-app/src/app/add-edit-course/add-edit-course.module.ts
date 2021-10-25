import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CourseDurationComponent } from './course-duration/course-duration.component';
import { CourseDateComponent } from './course-date/course-date.component';
import { CourseAuthorsComponent } from './course-authors/course-authors.component';

@NgModule({
  declarations: [
    AddEditCourseComponent,
    CourseDurationComponent,
    CourseDateComponent,
    CourseAuthorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class AddEditCourseModule { }
