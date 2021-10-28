import { Component, DoCheck, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, DoCheck {
  public firstPathFragment: string;
  public secondPathFragment: string;
  public pathLength: number;

  constructor(
    private _coursesService: CoursesService,
    private _location: Location
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.setRoute();
  }

  setRoute(): void {
    const three = 3;
    const two = 2;
    const path = this._location.path();
    const pathFragments = path.split('/');
    this.pathLength = pathFragments.length;

    switch (this.pathLength) {
    case two:
      switch (pathFragments[1] ) {
      case 'login':
        this.firstPathFragment = 'Login';
        break;
      case 'courses':
        this.firstPathFragment = 'Courses';
        break;
      default:
        this.firstPathFragment = 'Page not found';
      }
      break;
    case three:
      this.firstPathFragment = 'Courses';
      if (pathFragments[2] === 'new') {
        this.secondPathFragment = 'New course';
      } else if (this.pathLength === three) {
        const id = +pathFragments[2];
        this.secondPathFragment = this._coursesService.getCourse(id).title;
      }
      break;
    default:
      break;
    }
  }
}
