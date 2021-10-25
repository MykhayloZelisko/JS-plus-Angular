import { Component, OnInit } from '@angular/core';
import { ConfigDeleteCourse, Course } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public coursesList: Course[];
  public filteredList: Course[];
  public confirmDialogConfig: ConfigDeleteCourse = { isVisible: false, id: null, title: null };

  constructor(
    private _filter: FilterPipe,
    private _coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.coursesList = this._coursesService.getCourseList();
    this.filteredList = this.coursesList;
  }

  trackByIndex(index: number): number {
    return index;
  }

  loadCourses(): void {
    console.log('load more');
  }

  openConfirmDialog(id: number): void {
    const currentCourse = this.filteredList.find(course => course.id === id);
    if (currentCourse) {
      this.confirmDialogConfig = { isVisible: true, id: currentCourse.id, title: currentCourse.title };
    }
  }

  filterCourse(value: string): void {
    this.filteredList = this._filter.transform(this.coursesList, value);
  }

  confirmDelete(): void {
    this.deleteCourse();
    this.confirmDialogConfig = { isVisible: false, id: null, title: null };
  }

  cancelDelete(): void {
    this.confirmDialogConfig = { isVisible: false, id: null, title: null };
  }

  deleteCourse(): void {
    const id = this.confirmDialogConfig.id;
    this._coursesService.deleteCourse(id);
  }

  editCourse(course: Course): void {
    console.log(`edit course ${course.title}`);
  }
}
