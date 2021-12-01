import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthService } from './user/auth.service';
import { UserEffects } from './user/user.effects';
import { userReducer } from './user/user.reducer';



@NgModule({
  imports: [
    StoreModule.forRoot({
      user: userReducer
    }),
    EffectsModule.forRoot( [
      UserEffects
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
