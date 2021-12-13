import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  public value: string;
  public searchForm = this._fb.group({
    search: [
      ''
    ]
  })

  constructor(
    private _router: Router,
    private _store: Store<AppStoreState>,
    private _fb: FormBuilder
  ) { }

  search(): void {
    this.value = this.searchForm.getRawValue();
    this._store.dispatch(new ClearCourseList() );
    this.onSearch.emit(String(this.value.search) );
  }

  newCourse(): void {
    this._router.navigateByUrl('/courses/new');
  }
}
