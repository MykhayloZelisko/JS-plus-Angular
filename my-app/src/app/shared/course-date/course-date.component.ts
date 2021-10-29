import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss']
})
export class CourseDateComponent implements OnInit {
  @ViewChild('creationDateField') creationDateField: ElementRef;
  @Input() public creationDate: string;
  @Output() public setDateEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setDate(): void {
    this.setDateEvent.emit(this.creationDateField.nativeElement.value);
  }
}
