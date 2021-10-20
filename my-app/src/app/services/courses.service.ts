import { Injectable } from '@angular/core';
import { Course, CourseData } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesList: Course[] = [
    {
      id: 1,
      title: 'Video Course 1. Name tag',
      creationDate: '08/28/2022',
      duration: 88,
      description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
      topRated: false
    },
    {
      id: 2,
      title: 'Video Course 2. Name tag',
      creationDate: '10/01/2021',
      duration: 60,
      description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
      topRated: true
    },
    {
      id: 3,
      title: 'Video Course 3. Name tag',
      creationDate: '09/28/2021',
      duration: 55,
      description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
      topRated: true
    },
    {
      id: 4,
      title: 'Video Course 4. Name tag',
      creationDate: '10/28/2021',
      duration: 75,
      description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
      topRated: false
    },
    {
      id: 5,
      title: 'Video Course 5. Name tag',
      creationDate: '07/06/2020',
      duration: 34,
      description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
      topRated: false
    },
    {
      id: 6,
      title: 'Video Course 6. Name tag',
      creationDate: '08/29/2020',
      duration: 45,
      description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
      topRated: true
    },
    {
      id: 7,
      title: 'Video Course 7. Name tag',
      creationDate: '11/25/2021',
      duration: 124,
      description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
      topRated: true
    },
    {
      id: 8,
      title: 'Video Course 8. Name tag',
      creationDate: '12/28/2021',
      duration: 34,
      description: `Learn about where you can find course descriptions, what information they include, how they work,
      and details about various components of a course description.  Course descriptions report information about a
      university or college's classes. They're published both in course catalogs that outline degree requirements and
      in course schedules that contain descriptions for all courses offered during a particular semester.`,
      topRated: true
    }
  ];

  constructor() { }

  getCourseList(): Course[] {
    return this.coursesList;
  }

  createCourse(data: CourseData): void {
    const id = this.generateId();
    const topRated = false;
    const newCourse = { id, topRated, ...data };
    this.getCourseList().push(newCourse);
  }

  getCorse(id: number): Course {
    return this.getCourseList().find(courseItem => courseItem.id === id);
  }

  updateCourse(id: number, data: CourseData): void {
    const course = this.getCorse(id);
    course.creationDate = data.creationDate;
    course.description = data.description;
    course.duration = data.duration;
    course.title = data.title;
  }

  deleteCourse(id: number): void {
    const index = this.getCourseList().findIndex(item => item.id === id);
    this.getCourseList().splice(index, 1);
  }

  private generateId(): number {
    const arrayId = this.getCourseList().map(course => course.id);
    const newId = Math.max(...arrayId) + 1;
    return newId;
  }
}
