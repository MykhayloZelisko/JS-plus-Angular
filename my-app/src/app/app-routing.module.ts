import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { CoursesComponent } from './pages/courses/courses.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
