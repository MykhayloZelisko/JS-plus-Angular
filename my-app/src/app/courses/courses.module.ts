import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { AddSearchComponent } from './add-search/add-search.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { SharedModule } from '../shared/shared.module';
import { NewCourseDirective } from './directives/new-course.directive';
import { CoursesRoutingModule } from './courses-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

@NgModule({
  declarations: [
    CoursesComponent,
    AddSearchComponent,
    CourseItemComponent,
    NewCourseDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoursesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    }
  ]
})
export class CoursesModule { }
