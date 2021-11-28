import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { CoursesModule } from './courses/courses.module';
import { NewCourseModule } from './new-course/new-course.module';
import { EditCourseModule } from './edit-course/edit-course.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplyTokenInterceptor } from './interceptors/apply-token.interceptor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AppStoreModule } from './app-store/app-store.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    LogoComponent,
    IfAuthenticatedDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginModule,
    SharedModule,
    CoursesModule,
    NewCourseModule,
    EditCourseModule,
    HttpClientModule,
    AppStoreModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplyTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
