import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './pipes/duration.pipe';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseDateComponent } from './course-date/course-date.component';
import { CourseDurationComponent } from './course-duration/course-duration.component';
import { CourseAuthorsComponent } from './course-authors/course-authors.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DurationPipe,
    CourseFormComponent,
    CourseDateComponent,
    CourseDurationComponent,
    CourseAuthorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DurationPipe,
    CourseFormComponent,
    CourseDateComponent,
    CourseDurationComponent,
    CourseAuthorsComponent
  ]
})
export class SharedModule { }
