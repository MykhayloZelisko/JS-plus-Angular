import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-search',
  templateUrl: './add-search.component.html',
  styleUrls: ['./add-search.component.scss']
})
export class AddSearchComponent {
  public value = '';

  constructor(
    private _router: Router,
    private _coursesService: CoursesService
  ) { }

  search(): void {
    this._coursesService.searchValue.next(this.value);
  }

  newCourse(): void {
    this._router.navigateByUrl('/courses/new');
  }
}
