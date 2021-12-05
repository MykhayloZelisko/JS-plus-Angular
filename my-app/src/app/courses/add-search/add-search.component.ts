import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store/app-store.state';
import { ClearCourseList } from 'src/app/app-store/courses/course-list/course-list.actions';

@Component({
  selector: 'app-add-search',
  templateUrl: './add-search.component.html',
  styleUrls: ['./add-search.component.scss']
})
export class AddSearchComponent {
  @Output() public onSearch: EventEmitter<string> = new EventEmitter();
  public value = '';

  constructor(
    private _router: Router,
    private _store: Store<AppStoreState>
  ) { }

  search(): void {
    this._store.dispatch(new ClearCourseList() );
    this.onSearch.emit(this.value);
  }

  newCourse(): void {
    this._router.navigateByUrl('/courses/new');
  }
}
