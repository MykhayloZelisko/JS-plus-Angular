import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';

const routes: Routes = [{ path: '', component: AddEditCourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditCourseRoutingModule { }
