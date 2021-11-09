import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Course } from 'src/app/interfaces/course';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';

import { CourseItemComponent } from './course-item.component';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  const courseIdMock = 100;
  const courseMock: Course = { id: courseIdMock } as Course;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,
        DurationPipe
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = courseMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit on editcourse', () => {
    spyOn(component.edit, 'emit');
    component.editCourse();
    expect(component.edit.emit).toHaveBeenCalledOnceWith(courseMock);
  });

  it('should emit delete on deletecourse', () => {
    spyOn(component.delete, 'emit');
    component.deleteCourse();
    expect(component.delete.emit).toHaveBeenCalledOnceWith(courseIdMock);
  });
});
