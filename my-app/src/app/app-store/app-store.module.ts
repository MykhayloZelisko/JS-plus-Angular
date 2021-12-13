import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthorsService } from './authors/authors.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CourseListEffects } from './courses/course-list/course-list.effects';
import { courseListReducer } from './courses/course-list/course-list.reducer';
import { CourseEffects } from './courses/course/course.effects';
import { courseReducer } from './courses/course/course.reducer';
import { CoursesService } from './courses/courses.service';
import { loaderReducer } from './loader/loader.reducer';
import { paramsReducer } from './params/params.reducer';
import { AuthService } from './user/auth.service';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';



@NgModule({
  imports: [
    StoreModule.forRoot({
      user: userReducer,
      courseList: courseListReducer,
      params: paramsReducer,
      course: courseReducer,
      show: loaderReducer
    }),
    EffectsModule.forRoot( [
      UserEffects,
      CourseListEffects,
      CourseEffects
    ] ),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    })
  ],
  providers: [
    AuthService,
    CoursesService,
    AuthorsService
  ]
})
export class AppStoreModule { }
