import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesComponent } from './courses/courses.component';
import { AddSearchComponent } from './add-search/add-search.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SharedModule } from '../shared/shared.module';
import { NewCourseDirective } from './directives/new-course.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { CoursesRoutingModule } from './courses-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';

@NgModule({
  declarations: [
    CoursesComponent,
    AddSearchComponent,
    CourseItemComponent,
    OrderByPipe,
    NewCourseDirective,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoursesRoutingModule
  ],
  providers: [
    FilterPipe,
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    }
  ]
})
export class CoursesModule { }
