import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'new',
    loadChildren: () => import('../new-course/new-course.module').then(m => m.NewCourseModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    loadChildren: () => import('../edit-course/edit-course.module').then(m => m.EditCourseModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class CoursesRoutingModule { }
