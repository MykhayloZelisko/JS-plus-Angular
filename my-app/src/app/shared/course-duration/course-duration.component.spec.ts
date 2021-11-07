import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationPipe } from '../pipes/duration.pipe';

import { CourseDurationComponent } from './course-duration.component';

describe('CourseDurationComponent', () => {
  let component: CourseDurationComponent;
  let fixture: ComponentFixture<CourseDurationComponent>;
  const durationMock = 135;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseDurationComponent,
        DurationPipe
      ]
    })
      .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CourseDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.duration = durationMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit duration on component', () => {
    spyOn(component.setDurationEvent, 'emit');
    component.setDuration();
    expect(component.setDurationEvent.emit).toHaveBeenCalledOnceWith(durationMock);
  });
});
