import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CourseListEffects } from './courses/course-list/course-list.effects';
import { courseListReducer } from './courses/course-list/course-list.reducer';
import { CourseEffects } from './courses/course/course.effects';
import { courseReducer } from './courses/course/course.reducer';
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
      course: courseReducer
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
    AuthService
  ]
})
export class AppStoreModule { }
