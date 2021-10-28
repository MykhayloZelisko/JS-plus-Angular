import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-search',
  templateUrl: './add-search.component.html',
  styleUrls: ['./add-search.component.scss']
})
export class AddSearchComponent implements OnInit {
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  public value: string;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  search(): void {
    this.onSearch.emit(this.value);
  }

  newCourse(): void {
    this._router.navigateByUrl('/courses/new');
  }
}
