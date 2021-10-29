import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CourseData } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  @ViewChild('titleField') titleField: ElementRef;
  @ViewChild('descriptionField') descriptionField: ElementRef;
  @Input() public data: CourseData;
  @Output() public cancelEvent: EventEmitter<null> = new EventEmitter();
  @Output() public saveEvent: EventEmitter<CourseData> = new EventEmitter();

  public newData: CourseData = {
    title: null,
    description: null,
    duration: null,
    creationDate: null
  };

  constructor() { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.cancelEvent.emit(null);
  }

  setDate(date: string): void {
    this.newData.creationDate = date;
  }

  setDuration(duration: number): void {
    this.newData.duration = duration;
  }

  saveCourse(): void {
    this.newData = {
      ...this.newData,
      title: this.titleField.nativeElement.value,
      description: this.descriptionField.nativeElement.value
    };
    this.saveEvent.emit(this.newData);
  }
}
