import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public coursesList: Course[];
  constructor() { }

  ngOnInit(): void {
    this.coursesList = [
      {
        id: 1,
        title: 'Video Course 1. Name tag',
        creationDate: '08/28/2020',
        duration: 88,
        description: `Learn about where you can find course descriptions, what information they include, how they work,
        and details about various components of a course description.  Course descriptions report information about a
        university or college's classes. They're published both in course catalogs that outline degree requirements and
        in course schedules that contain descriptions for all courses offered during a particular semester.`
      },
      {
        id: 2,
        title: 'Video Course 2. Name tag',
        creationDate: '08/28/2020',
        duration: 88,
        description: `Learn about where you can find course descriptions, what information they include, how they work,
        and details about various components of a course description.  Course descriptions report information about a
        university or college's classes. They're published both in course catalogs that outline degree requirements and
        in course schedules that contain descriptions for all courses offered during a particular semester.`
      },
      {
        id: 3,
        title: 'Video Course 3. Name tag',
        creationDate: '08/28/2020',
        duration: 88,
        description: `Learn about where you can find course descriptions, what information they include, how they work,
        and details about various components of a course description.  Course descriptions report information about a
        university or college's classes. They're published both in course catalogs that outline degree requirements and
        in course schedules that contain descriptions for all courses offered during a particular semester.`
      },
      {
        id: 4,
        title: 'Video Course 4. Name tag',
        creationDate: '08/28/2020',
        duration: 88,
        description: `Learn about where you can find course descriptions, what information they include, how they work,
        and details about various components of a course description.  Course descriptions report information about a
        university or college's classes. They're published both in course catalogs that outline degree requirements and
        in course schedules that contain descriptions for all courses offered during a particular semester.`
      },
      {
        id: 5,
        title: 'Video Course 5. Name tag',
        creationDate: '08/28/2020',
        duration: 88,
        description: `Learn about where you can find course descriptions, what information they include, how they work,
        and details about various components of a course description.  Course descriptions report information about a
        university or college's classes. They're published both in course catalogs that outline degree requirements and
        in course schedules that contain descriptions for all courses offered during a particular semester.`
      },
      {
        id: 6,
        title: 'Video Course 6. Name tag',
        creationDate: '08/28/2020',
        duration: 88,
        description: `Learn about where you can find course descriptions, what information they include, how they work,
        and details about various components of a course description.  Course descriptions report information about a
        university or college's classes. They're published both in course catalogs that outline degree requirements and
        in course schedules that contain descriptions for all courses offered during a particular semester.`
      },
      {
        id: 7,
        title: 'Video Course 7. Name tag',
        creationDate: '08/28/2020',
        duration: 88,
        description: `Learn about where you can find course descriptions, what information they include, how they work,
        and details about various components of a course description.  Course descriptions report information about a
        university or college's classes. They're published both in course catalogs that outline degree requirements and
        in course schedules that contain descriptions for all courses offered during a particular semester.`
      },
      {
        id: 8,
        title: 'Video Course 8. Name tag',
        creationDate: '08/28/2020',
        duration: 88,
        description: `Learn about where you can find course descriptions, what information they include, how they work,
        and details about various components of a course description.  Course descriptions report information about a
        university or college's classes. They're published both in course catalogs that outline degree requirements and
        in course schedules that contain descriptions for all courses offered during a particular semester.`
      }
    ];
  }

  trackByIndex(index: number): number {
    return index;
  }

  loadCourses(): void {
    console.log('load more');
  }

  deleteCourse(course: Course): void {
    console.log(course.id);
  }
}
