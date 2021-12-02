/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course, CourseData } from '../../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public searchValue: BehaviorSubject<string> = new BehaviorSubject('');
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getCourseList(params?: { start: number, count: number, textFragment: string, sort: string }): Observable<Course[]> {
    return this._http.get<Course[]>(`${this.apiUrl}/courses`, { params }).pipe(
      map( (list: any[] ) => list.map( (item: any) => this.courseMap(item) ) )
    );
  }

  createCourse(data: CourseData): Observable<any> {
    return this.getCourseList().pipe(
      take(1),
      switchMap( (res: Course[] ) => {
        const newFormatData = {
          id: Math.max(...res.map(course => course.id) ) + 1,
          name: data.title,
          description: data.description,
          date: data.creationDate,
          authors: [{}],
          length: data.duration,
          isTopRated: false
        };
        return this._http.post(`${this.apiUrl}/courses`, newFormatData);
      })
    );
  }

  getCourse(id: number): Observable<Course> {
    return this._http.get(`${this.apiUrl}/courses/${id}`).pipe(
      map( (item: any) => this.courseMap(item) )
    );
  }

  updateCourse(id: number, data: CourseData): Observable<any> {
    const newFormatData = {
      name: data.title,
      description: data.description,
      date: data.creationDate,
      authors: data.authors,
      length: data.duration
    };
    return this._http.patch(`${this.apiUrl}/courses/${id}`, newFormatData).pipe(
      take(1)
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/courses/${id}`).pipe(
      take(1)
    );
  }

  private courseMap(item: any): Course {
    return {
      id: item.id,
      title: item.name,
      description: item.description,
      topRated: item.isTopRated,
      creationDate: item.date,
      authors: item.authors.map( (author: any) => ({
        id: author.id,
        name: author.name
      }) ),
      duration: item.length
    };
  }
}
