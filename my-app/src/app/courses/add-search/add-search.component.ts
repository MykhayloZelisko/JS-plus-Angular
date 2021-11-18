import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-search',
  templateUrl: './add-search.component.html',
  styleUrls: ['./add-search.component.scss']
})
export class AddSearchComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  public value = '';

  constructor(private _router: Router) { }

  search(): void {
    this.onSearch.emit(this.value);
  }

  newCourse(): void {
    this._router.navigateByUrl('/courses/new');
  }
}
