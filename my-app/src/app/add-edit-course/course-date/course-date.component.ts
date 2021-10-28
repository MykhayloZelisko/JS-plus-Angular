import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss']
})
export class CourseDateComponent implements OnInit {
  @ViewChild('creationDateField') creationDateField: ElementRef;
  @Input() public creationDate: string;
  @Output() public getDateEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getDate(): void {
    this.getDateEvent.emit(this.creationDateField.nativeElement.value);
  }
}
