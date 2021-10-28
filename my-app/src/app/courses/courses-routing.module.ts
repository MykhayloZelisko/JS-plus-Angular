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
    loadChildren: () => import('../add-edit-course/add-edit-course.module').then(m => m.AddEditCourseModule),
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    loadChildren: () => import('../add-edit-course/add-edit-course.module').then(m => m.AddEditCourseModule),
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
