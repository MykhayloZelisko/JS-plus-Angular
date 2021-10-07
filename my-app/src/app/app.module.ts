import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { AddSearchComponent } from './components/add-search/add-search.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { FormsModule } from '@angular/forms';
import { NewCourseDirective } from './directives/new-course.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    AddSearchComponent,
    CourseItemComponent,
    FooterComponent,
    LogoComponent,
    CoursesComponent,
    NewCourseDirective,
    OrderByPipe,
    FilterPipe,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    FilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
