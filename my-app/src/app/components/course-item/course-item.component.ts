import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit, OnChanges {
  @Input() public course: Course;
  @Output() public delete: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('onInit');
  }

  ngOnChanges(): void {
    console.log('onChanges');
  }

  editCourse(): void {
    console.log(`edit course ${this.course.id}`);
  }

  deleteCourse(): void {
    this.delete.emit(this.course.id);
  }
}
