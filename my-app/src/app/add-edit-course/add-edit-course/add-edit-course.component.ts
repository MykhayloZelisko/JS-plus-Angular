import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss']
})
export class AddEditCourseComponent implements OnInit {
  public course: Course;

  constructor() { }

  ngOnInit(): void {
  }

  cancel(): void {
    console.log('cancel');
  }

  saveCourse(): void {
    console.log('save');
  }

}
