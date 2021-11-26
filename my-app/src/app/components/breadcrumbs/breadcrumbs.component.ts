import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { filter, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public firstPathFragment: string;
  public secondPathFragment: string;
  public pathLength: number;
  public routeSub: Subscription;
  public getCourseSub: Subscription;

  constructor(
    private _coursesService: CoursesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.setRoute();
  }

  ngOnDestroy(): void {
    this.routeSub && this.routeSub.unsubscribe();
    this.getCourseSub && this.getCourseSub.unsubscribe();
  }

  setRoute(): void {
    const two = 2;
    const three = 3;
    this.routeSub = this._router.events.pipe(
      filter( (event: Event) => event instanceof NavigationEnd)
    ).subscribe( (event: Event) => {
      const path = (event as NavigationEnd).url;
      const pathFragments = path.split('/');
      this.pathLength = pathFragments.length;

      switch (this.pathLength) {
      case two:
        switch (pathFragments[1] ) {
        case 'login':
          this.firstPathFragment = 'Login';
          break;
        case 'courses':
        case '':
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
        } else {
          const id = +pathFragments[2];
          this.getCourseSub = this._coursesService.getCourse(id).pipe(
            take(1)
          ).subscribe(
            (course: Course) => {
              this.secondPathFragment = course.title;
            }
          );
        }
        break;
      default:
        this.firstPathFragment = 'Page not found';
        break;
      }
    });
  }
}
