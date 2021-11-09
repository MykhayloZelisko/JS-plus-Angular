import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() public course: Course;
  @Output() public delete: EventEmitter<number> = new EventEmitter();
  @Output() public edit: EventEmitter<Course> = new EventEmitter();

  constructor() { }

  editCourse(): void {
    this.edit.emit(this.course);
  }

  deleteCourse(): void {
    this.delete.emit(this.course.id);
  }
}
