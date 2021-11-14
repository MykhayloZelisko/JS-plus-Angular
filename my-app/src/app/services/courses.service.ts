/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course, CourseData } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getCourseList(params?: HttpParams): Observable<Course[]> {
    return this._http.get<Course[]>(`${this.apiUrl}/courses`, { params }).pipe(
      map( (list: any[] ) => list.map( (item: any) => ({
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
      }) ) )
    );
  }

  createCourse(data: CourseData): void {
    this.getCourseList().pipe(
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
    ).subscribe();
  }

  getCourse(id: number): Observable<Course> {
    return this._http.get(`${this.apiUrl}/courses/${id}`).pipe(
      map( (item: any) => ({
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
      }) )
    );
  }

  updateCourse(id: number, data: CourseData): void {
    const newFormatData = {
      name: data.title,
      description: data.description,
      date: data.creationDate,
      authors: data.authors,
      length: data.duration
    };
    this._http.patch(`${this.apiUrl}/courses/${id}`, newFormatData).pipe(
      take(1)
    ).subscribe();
  }

  deleteCourse(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/courses/${id}`).pipe(
      take(1)
    );
  }
}
