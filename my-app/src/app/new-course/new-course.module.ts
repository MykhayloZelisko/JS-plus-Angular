import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCourseComponent } from './new-course/new-course.component';
import { SharedModule } from '../shared/shared.module';
import { NewCourseRoutingModule } from './new-course-routing.module';

@NgModule({
  declarations: [
    NewCourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewCourseRoutingModule
  ]
})
export class NewCourseModule { }
