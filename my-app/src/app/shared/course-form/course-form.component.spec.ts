/* eslint-disable no-magic-numbers */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseData } from 'src/app/interfaces/course';

import { CourseFormComponent } from './course-form.component';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  const dataMock: CourseData = {
    title: 'Video Course 1. Name tag',
    creationDate: '08/28/2022',
    duration: 88,
    description: `Learn about where you can find course descriptions, what information they include, how they work,
    and details about various components of a course description.  Course descriptions report information about a
    university or college's classes. They're published both in course catalogs that outline degree requirements and
    in course schedules that contain descriptions for all courses offered during a particular semester.`
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseFormComponent ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    component.data = dataMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data', () => {
    component.ngOnInit();
    expect(component.newData).toEqual(component.data);
  });

  it('should emit cancel', () => {
    spyOn(component.cancelEvent, 'emit');
    component.cancel();
    expect(component.cancelEvent.emit).toHaveBeenCalledOnceWith(null);
  });

  it('should set date', () => {
    component.setDate('11/06/2021');
    expect(component.newData.creationDate).toBe('11/06/2021');
  });

  it('should set duration', () => {
    component.setDuration(125);
    expect(component.newData.duration).toBe(125);
  });

  it('should save course', () => {
    spyOn(component.saveEvent, 'emit');
    component.saveCourse();
    expect(component.saveEvent.emit).toHaveBeenCalledOnceWith(component.newData);
  });
});
