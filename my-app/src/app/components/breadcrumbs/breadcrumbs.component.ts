import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy, DoCheck {
  public firstPathFragment: string;
  public secondPathFragment: string;
  public pathLength: number;
  public routeSub: Subscription;
  public isAuthenticated: boolean;

  constructor(
    private _coursesService: CoursesService,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setRoute();
  }

  ngDoCheck(): void {
    this.isAuthenticated = this._authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.routeSub && this.routeSub.unsubscribe();
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
    });
  }
}
