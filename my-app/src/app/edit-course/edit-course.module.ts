import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { SharedModule } from '../shared/shared.module';
import { EditCourseRoutingModule } from './edit-course-routing.module';

@NgModule({
  declarations: [
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditCourseRoutingModule
  ]
})
export class EditCourseModule { }
