import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CourseListEffects } from './courses/courses.effects';
import { courseListReducer } from './courses/courses.reducer';
import { AuthService } from './user/auth.service';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';



@NgModule({
  imports: [
    StoreModule.forRoot({
      user: userReducer,
      courseList: courseListReducer
    }),
    EffectsModule.forRoot( [
      UserEffects,
      CourseListEffects
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
